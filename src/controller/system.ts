import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Boiler } from "./devices/boiler";
import { CHPump } from "./devices/ch-pump";
import { HWPump } from "./devices/hw-pump";
import { Switchable } from "./switchable";
import { ControlStateSnapshot, DeviceStateSnapshot, IControllable, IControllerSettings, INJECTABLES, ISwitchable } from "./types";

@injectable()
export class System implements IControllable {
    @inject(INJECTABLES.Boiler) private boiler: ISwitchable;
    @inject(INJECTABLES.CHPump) private chPump: ISwitchable;
    @inject(INJECTABLES.HWPump) private hwPump: ISwitchable;

    public applyControlState(state: ControlStateSnapshot): void {

        // map the control state to individual device states
        const boilerState: boolean = (state.heating || state.hotWater);
        const hwPumpState: boolean = state.hotWater;
        const chPumpState: boolean = state.heating;

        // switch the devices
        this.boiler.switch(boilerState);
        this.hwPump.switch(hwPumpState);
        this.chPump.switch(chPumpState);
    }

    public getDeviceState(): DeviceStateSnapshot {

        // return a snapshot of the device states (boiler on, pump off etc)
        return new DeviceStateSnapshot(
            this.boiler.getState(),
            this.hwPump.getState(),
            this.chPump.getState());
    }
}
