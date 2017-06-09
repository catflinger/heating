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

    public calculateControlState(currentState: Snapshot): ControlStateSnapshot {
        let heating: boolean = false;
        let water: boolean = false;
        const currentSlot: number = this.clock.currentSlot;

        // First set the hot water.
        // If the temp is too low, keep trying to raise the temmperature.   If the temperature is over the minimum
        // already then keep the boiler on until it is over the maximum.  This hysteresis avoids cycling on/offf around
        // the minimum temp
        if (currentState.environment.hwTemperature < currentState.program.minHwTemp ||
            (currentState.environment.hwTemperature < currentState.program.maxHwTemp &&
             currentState.control.hotWater)) {
            water = true;
        }

        // now set the heating, simple and straightforward
        heating = currentState.program.slots[currentSlot];

        // if there is an override apply it
        const ov = currentState.override;

        if (ov && currentSlot >= ov.start && currentSlot < ov.start + ov.duration) {
            heating = ov.state;
        }

        return new ControlStateSnapshot(heating, water);
    }
}