import { OverrideSnapshot, ProgramConfig } from "../types";
import { ProgramSnapshot } from "./program-snapshot";
import { ISnapshot } from "./snapshot";

export class ControllerSnapshot implements ISnapshot<ControllerSnapshot> {
    private _overrides: OverrideSnapshot[] = [];
    private _activeProgram: ProgramSnapshot;

    constructor(overrides: OverrideSnapshot[], activeProgram: ProgramSnapshot) {
        overrides.forEach((override) => this._overrides.push(override.clone()));
        this._activeProgram = activeProgram.clone();
    }

    public get activeProgram(): ProgramSnapshot {
        return this._activeProgram;
    }

    public forEachOverride(func: (item: OverrideSnapshot) => void): void {
        this._overrides.forEach((ov) => func(ov));
    }

    public overridesToStoreable(): any[]  {
        const ovArray: any[] = [];
        this._overrides.forEach((ov) => ovArray.push(ov.toStorable()));
        return ovArray;
    }

    public clone(): ControllerSnapshot {
        return new ControllerSnapshot(
            this._overrides,
            this._activeProgram);
    }

    public toStorable(): any {
        return {
            activeProgram: this._activeProgram.toStorable(),
            overrides: this.overridesToStoreable(),
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
