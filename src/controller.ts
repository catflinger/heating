import { inject, injectable } from "inversify";
import "reflect-metadata";

import { BasicControlStrategy } from "./basic-control-strategy";
import {
    ControlStateSnapshot,
    DeviceStateSnapshot,
    EnvironmentSnapshot,
    IController,
    IControllerSettings,
    IControlStrategy,
    IEnvironment,
    INJECTABLES,
    IProgram,
    ISwitchable,
    OverrideSnapshot,
    Snapshot,
} from "./types";

@injectable()
export class Controller implements IController {

    private currentControlState: ControlStateSnapshot;
    private chOverride: OverrideSnapshot = null;

    @inject(INJECTABLES.ControlStrategy)
    private strategy: IControlStrategy;

    @inject(INJECTABLES.ControllerSettings)
    private settings: IControllerSettings;

    @inject(INJECTABLES.Environment)
    private environment: IEnvironment;

    @inject(INJECTABLES.Program)
    private program: IProgram;

    @inject(INJECTABLES.Boiler)
    private boiler: ISwitchable;

    @inject(INJECTABLES.HWPump)
    private hwPump: ISwitchable;

    @inject(INJECTABLES.CHPump)
    private chPump: ISwitchable;

    constructor() {

        this.currentControlState = new ControlStateSnapshot(false, false);
    }

    public getSnapshot(): Snapshot {
        return new Snapshot(
            this.currentControlState.clone(),
            this.environment.getSnapshot(),
            this.getDevicelState(),
            this.chOverride ? this.chOverride.clone() : null);
    }

    public refresh(): void {

        // get the new control state
        const newState: ControlStateSnapshot = this.strategy.calculateControlState(this.program, this.getSnapshot());

        // apply it to the system
        this.applyControlState(newState);
    }

    public setOverride(start: number, duration: number, state: boolean): void {

        if (isNaN(start) || !isFinite(start) || start < 0 || start >= this.settings.slotsPerDay ||
            isNaN(duration) || !isFinite(duration) || duration < 0 || start + duration >= this.settings.slotsPerDay) {

            throw new Error("value out of range in Controller:setOverride");
        }

        this.chOverride = new OverrideSnapshot(start, duration, state);
    }

    public clearOverride(): void {
        this.chOverride = null;
    }
    /************************************** PRIVATE MEMBERS AREA ****************************************/

    private getDevicelState(): DeviceStateSnapshot {

        // return a snapshot of the device states (boiler on, pump off etc)
        return new DeviceStateSnapshot(
            this.boiler.state,
            this.hwPump.state,
            this.chPump.state);
    }

    private applyControlState(state: ControlStateSnapshot) {

        // map the control state to individual device states
        const boilerState: boolean = (state.heating || state.hotWater);
        const hwPumpState: boolean = state.hotWater;
        const chPumpState = state.heating;

        // switch the devices
        this.boiler.switch(boilerState);
        this.hwPump.switch(hwPumpState);
        this.chPump.switch(chPumpState);

        // remember the new control state
        this.currentControlState = state.clone();

    }
}
