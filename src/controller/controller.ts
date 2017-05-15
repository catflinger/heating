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
    Snapshot,
} from "./types";

@injectable()
export class Controller implements IController {

    private strategy: IControlStrategy;
    private currentControlState: ControlStateSnapshot;

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

        // TO DO: should we inject this?  Will there ever be omore than one type of control strategy?
        this.strategy = new BasicControlStrategy();
        this.currentControlState = new ControlStateSnapshot(false, false);
    }

    public getSnapshot(): Snapshot {
        return new Snapshot(
            this.getControlState(),
            this.environment.getSnapshot(),
            this.getDevicelState());
    }

    public refresh(): void {

        // get the new control state
        const newState: ControlStateSnapshot = this.strategy.calculateControlState(this.program, this.getSnapshot());

        // apply it to the system
        this.applyControlState(newState);
    }

    private getDevicelState(): DeviceStateSnapshot {

        // return a snapshot of the device states (boiler on, pump off etc)
        return new DeviceStateSnapshot(
            this.boiler.state,
            this.hwPump.state,
            this.chPump.state);
    }

    private getControlState(): ControlStateSnapshot {

        // return a snapshot of the current control state (hetaing off, hot water on etc)
        return this.currentControlState.clone();
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
