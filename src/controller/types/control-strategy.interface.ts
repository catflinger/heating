import { ControlStateSnapshot } from "./controlstate-snapshot";
import { IProgram } from "./injectable.interfaces";
import { Snapshot } from "./snapshot";

/**
 * interface for control strategies
 */
export interface IControlStrategy {
    calculateControlState(
        program: IProgram,
        currentState: Snapshot): ControlStateSnapshot;
}
