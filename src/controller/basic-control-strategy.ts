import { inject, injectable } from "inversify";
import {
    ControlStateSnapshot,
    IClock,
    IControlStrategy,
    INJECTABLES,
    OverrideSnapshot,
    ProgramSnapshot,
    SensorSnapshot,
} from "./types";
import { ISensor } from "./types/injectable.interfaces";

@injectable()
export class BasicControlStrategy implements IControlStrategy {

    @inject(INJECTABLES.Clock)
    private clock: IClock;

    public calculateControlState(
        env: SensorSnapshot[],
        program: ProgramSnapshot,
        current: ControlStateSnapshot,
        overrides: OverrideSnapshot[],
        )
        : ControlStateSnapshot {

        let heating: boolean = false;
        let water: boolean = false;
        const currentSlot: number = this.clock.currentSlot;

        // First set the hot water, skip this if no hw sensor configured
        const hwSensor: SensorSnapshot = env.find((s) => s.role === "hw");

        if (hwSensor) {
            // If the temp is too low, keep trying to raise the temmperature.   If the temperature is over the minimum
            // already then keep the boiler on until it is over the maximum.  This hysteresis avoids cycling on/offf around
            // the minimum temp
            const hwTemperature: number = hwSensor.reading;

            if (hwTemperature < program.minHWTemp ||
                (hwTemperature < program.maxHWTemp && current.hotWater)) {
                water = true;
            }

        } else {
            water = false;
        }

        // now set the heating, simple and straightforward
        heating = program.slots[currentSlot];

        // if there are any overrides apply them
        overrides.forEach((ov) => {
            if (currentSlot >= ov.start && currentSlot < ov.start + ov.duration) {
                heating = ov.state;
            }
        });

        return new ControlStateSnapshot(heating, water);
    }
}
