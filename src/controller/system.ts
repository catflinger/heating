import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Switchable } from "./switchable";
import { ControlStateSnapshot, DeviceStateSnapshot, IControllable, IControllerSettings, INJECTABLES, ISwitchable, Snapshot } from "./types";

@injectable()
export class System implements IControllable {

    private boiler: ISwitchable;
    private hwPump: ISwitchable;
    private chPump: ISwitchable;

    @inject(INJECTABLES.ControllerSettings)
    private settings: IControllerSettings;

    public start(): void {
        this.boiler = new Switchable("boiler", this.settings.boilerPin);
        this.chPump = new Switchable("heating pump", this.settings.chPumpPin);
        this.hwPump = new Switchable("hot water pump", this.settings.hwPumpPin);
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

    public getDeviceState(): DeviceStateSnapshot {

        // return a snapshot of the device states (boiler on, pump off etc)
        return new DeviceStateSnapshot(
            this.boiler.state,
            this.hwPump.state,
            this.chPump.state);
    }
}
