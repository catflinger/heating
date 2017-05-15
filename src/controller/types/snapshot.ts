import { ControlStateSnapshot } from "./controlstate-snapshot";
import { DeviceStateSnapshot } from "./devicestate-snapshot";
import { EnvironmentSnapshot } from "./environment-snapshot";

export class Snapshot {
    private _control: ControlStateSnapshot;
    private _environment: EnvironmentSnapshot;
    private _device: DeviceStateSnapshot;

    constructor(control: ControlStateSnapshot, environment: EnvironmentSnapshot, device: DeviceStateSnapshot) {
        this._control = control;
        this._environment = environment;
        this._device = device;

    }

    public get control(): ControlStateSnapshot {
        return this._control;
    }

    public get environment(): EnvironmentSnapshot {
        return this._environment;
    }

    public get device(): DeviceStateSnapshot {
        return this._device;
    }
}
