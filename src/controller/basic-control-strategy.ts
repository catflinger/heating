import { inject, injectable } from "inversify";
import {
    ControlStateSnapshot,
    DeviceStateSnapshot,
    EnvironmentSnapshot,
    IClock,
    IControlStrategy,
    INJECTABLES,
    IProgram,
    OverrideSnapshot,
    SensorSnapshot,
    SummarySnapshot,
} from "./types";

@injectable()
export class BasicControlStrategy implements IControlStrategy {

    @inject(INJECTABLES.Clock)
    private clock: IClock;

    public calculateControlState(currentState: SummarySnapshot): ControlStateSnapshot {
        let heating: boolean = false;
        let water: boolean = false;
        const currentSlot: number = this.clock.currentSlot;

        // First set the hot water.
        // If the temp is too low, keep trying to raise the temmperature.   If the temperature is over the minimum
        // already then keep the boiler on until it is over the maximum.  This hysteresis avoids cycling on/offf around
        // the minimum temp
        const hwTemperature: number = currentState.environment.getSensor("hw").reading;

        if (hwTemperature < currentState.controller.activeProgram.minHwTemp ||
            (hwTemperature < currentState.controller.activeProgram.maxHwTemp &&
                currentState.control.hotWater)) {
            water = true;
        }

        // now set the heating, simple and straightforward
        heating = currentState.controller.activeProgram.slots[currentSlot];

        // if there are any overrides apply them
        currentState.controller.forEachOverride((ov) => {
            if (currentSlot >= ov.start && currentSlot < ov.start + ov.duration) {
                heating = ov.state;
            }
        });

        return new ControlStateSnapshot(heating, water);
    }
}
