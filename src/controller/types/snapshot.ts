import { ControlStateSnapshot } from "./controlstate-snapshot";
import { EnvironmentSnapshot } from "./environment-snapshot";

export class Snapshot {
    private _control: ControlStateSnapshot;
    private _environment: EnvironmentSnapshot;

    constructor(control: ControlStateSnapshot, environment: EnvironmentSnapshot) {
        this._control = control;
        this._environment = environment;
    }

    public get control(): ControlStateSnapshot {
        return this._control;
    }

    public get environment(): EnvironmentSnapshot {
        return this._environment;
    }
}
