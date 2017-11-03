import { ControlStateSnapshot, IControlStrategy, Snapshot } from "./types";
export declare class BasicControlStrategy implements IControlStrategy {
    private clock;
    calculateControlState(currentState: Snapshot): ControlStateSnapshot;
}
