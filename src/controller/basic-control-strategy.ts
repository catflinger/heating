import {
    ControlStateSnapshot,
    EnvironmentSnapshot,
    IControlStrategy,
    IProgram } from "./types";

export class BasicControlStrategy implements IControlStrategy {
    public calculateControlState(
        program: IProgram,
        currentControlState: ControlStateSnapshot,
        env: EnvironmentSnapshot): ControlStateSnapshot {

        throw new Error("Method not implemented.");
    }
}
