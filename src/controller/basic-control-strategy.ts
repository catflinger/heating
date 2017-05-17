import {
    ControlStateSnapshot,
    DeviceStateSnapshot,
    EnvironmentSnapshot,
    IControlStrategy,
    IProgram,
    Snapshot,
} from "./types";

export class BasicControlStrategy implements IControlStrategy {

    public calculateControlState(program: IProgram, currentState: Snapshot): ControlStateSnapshot {
        const heating: boolean = false;
        let water: boolean = false;

        // If the temp is too low, keep trying to raise the temmperature.   If the temperature is over the minimum
        // already then keep the boiler on until it is over the maximum.  This hysteresis avoids cycling on/offf around
        // the minimum temp
        if (currentState.environment.hwTemperature < program.minHWTemp ||
            (currentState.environment.hwTemperature < program.maxHWTemp && currentState.control.hotWater)) {
            water = true;
        }

        // TO DO: set the heating from the program and time of day...
        // write some tests for this module first

        return new ControlStateSnapshot(heating, water);
    }
}
