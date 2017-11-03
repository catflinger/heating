import { ControlStateSnapshot } from "./controlstate-snapshot";
import { DeviceStateSnapshot } from "./devicestate-snapshot";
import { EnvironmentSnapshot } from "./environment-snapshot";
import { OverrideSnapshot } from "./override-snapshot";
import { ProgramSnapshot } from "./program-snapshot";
export declare class Snapshot {
    private _control;
    private _environment;
    private _device;
    private _override;
    private _program;
    constructor(control: ControlStateSnapshot, environment: EnvironmentSnapshot, device: DeviceStateSnapshot, override: OverrideSnapshot, program: ProgramSnapshot);
    readonly control: ControlStateSnapshot;
    readonly environment: EnvironmentSnapshot;
    readonly device: DeviceStateSnapshot;
    readonly override: OverrideSnapshot;
    readonly program: ProgramSnapshot;
}
