import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Switchable } from "./switchable";
import { ControlStateSnapshot, DeviceStateSnapshot, IControllable, IControllerSettings, INJECTABLES, ISwitchable, Snapshot } from "./types";

@injectable()
export class System implements IControllable {

    @inject(INJECTABLES.Boiler)
    private boiler: ISwitchable;

    @inject(INJECTABLES.HWPump)
    private hwPump: ISwitchable;

    @inject(INJECTABLES.CHPump)
    private chPump: ISwitchable;

    @inject(INJECTABLES.ControllerSettings)
    private settings: IControllerSettings;

    public start(): void {
        this.boiler.init();
        this.chPump.init();
        this.hwPump.init();
    }

    public applyControlState(state: ControlStateSnapshot): void {

        // map the control state to individual device states
        const boilerState: boolean = (state.heating || state.hotWater);
        const hwPumpState: boolean = state.hotWater;
        const chPumpState = state.heating;

        // switch the devices
        this.boiler.switch(boilerState);
        this.hwPump.switch(hwPumpState);
        this.chPump.switch(chPumpState);
    }

    public getDevicelState(): DeviceStateSnapshot {

        // return a snapshot of the device states (boiler on, pump off etc)
        return new DeviceStateSnapshot(
            this.boiler.state,
            this.hwPump.state,
            this.chPump.state);
    }
}
