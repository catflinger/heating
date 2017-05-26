import { ControlStateSnapshot } from "./controlstate-snapshot";
import { DeviceStateSnapshot } from "./devicestate-snapshot";
import { EnvironmentSnapshot } from "./environment-snapshot";
import { OverrideSnapshot } from "./override-snapshot";
import { ProgramSnapshot } from "./program-snapshot";

export class Snapshot {
    private _control: ControlStateSnapshot;
    private _environment: EnvironmentSnapshot;
    private _device: DeviceStateSnapshot;
    private _override: OverrideSnapshot;
    private _program: ProgramSnapshot;

    constructor(control: ControlStateSnapshot,
                environment: EnvironmentSnapshot,
                device: DeviceStateSnapshot,
                override: OverrideSnapshot,
                program: ProgramSnapshot) {

        this._control = control;
        this._environment = environment;
        this._device = device;
        this._override = override;
        this._program = program;
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

    public get override(): OverrideSnapshot {
        return this._override;
    }

    public get program(): ProgramSnapshot {
        return this._program;
    }
}
