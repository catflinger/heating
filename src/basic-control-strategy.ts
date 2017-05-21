import { inject, injectable } from "inversify";
import {
    ControlStateSnapshot,
    DeviceStateSnapshot,
    EnvironmentSnapshot,
    IClock,
    IControlStrategy,
    INJECTABLES,
    IProgram,
    Snapshot,
} from "./types";

@injectable()
export class BasicControlStrategy implements IControlStrategy {

    @inject(INJECTABLES.Clock)
    private clock: IClock;

    public calculateControlState(program: IProgram, currentState: Snapshot): ControlStateSnapshot {
        let heating: boolean = false;
        let water: boolean = false;

        // First set the hot water.
        // If the temp is too low, keep trying to raise the temmperature.   If the temperature is over the minimum
        // already then keep the boiler on until it is over the maximum.  This hysteresis avoids cycling on/offf around
        // the minimum temp
        if (currentState.environment.hwTemperature < program.minHWTemp ||
            (currentState.environment.hwTemperature < program.maxHWTemp && currentState.control.hotWater)) {
            water = true;
        }

        // now set the heating, simple and straightforward
        heating = program.getValue(this.clock.currentSlot);

        return new ControlStateSnapshot(heating, water);
    }
}
