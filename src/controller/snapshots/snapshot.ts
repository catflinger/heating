import { ControlStateSnapshot } from "./controlstate-snapshot";
import { DeviceStateSnapshot } from "./devicestate-snapshot";
import { EnvironmentSnapshot } from "./environment-snapshot";
import { OverrideSnapshot } from "./override-snapshot";
import { ProgramSnapshot } from "./program-snapshot";

export class Snapshot {
    private _control: ControlStateSnapshot;
    private _environment: EnvironmentSnapshot;
    private _device: DeviceStateSnapshot;
    private _overrides: OverrideSnapshot[];
    private _program: ProgramSnapshot;

    constructor(control: ControlStateSnapshot,
                environment: EnvironmentSnapshot,
                device: DeviceStateSnapshot,
                overrides: OverrideSnapshot[],
                program: ProgramSnapshot) {

        this._control = control;
        this._environment = environment;
        this._device = device;
        this._program = program;
        this._overrides = overrides;
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

    public get overrides(): OverrideSnapshot[] {
        return this._overrides;
    }

    public get program(): ProgramSnapshot {
        return this._program;
    }
}
