import {
    ControlStateSnapshot,
    EnvironmentSnapshot,
    IControlStrategy,
    IProgram,
    Snapshot,
} from "./types";

export class BasicControlStrategy implements IControlStrategy {
    public calculateControlState(
        program: IProgram,
        currentControlState: Snapshot): ControlStateSnapshot {

        // turn everything on
        return new ControlStateSnapshot(true, true, true);
    }
}
