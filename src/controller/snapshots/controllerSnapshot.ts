import { OverrideSnapshot, ProgramConfig } from "../types";
import { ProgramSnapshot } from "./program-snapshot";

export class ControllerSnapshot {
    constructor(
        public overrides: OverrideSnapshot[],
        public activeProgram: ProgramSnapshot,
    ) {
    }

    public clone(): ControllerSnapshot {
        const ovArray: OverrideSnapshot[] = [];
        this.overrides.forEach((override) => ovArray.push(override.clone()));

        return new ControllerSnapshot(
            ovArray,
            this.activeProgram.clone());
    }
}
