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

        // First set the hot water.
        // If the temp is too low, keep trying to raise the temmperature.   If the temperature is over the minimum
        // already then keep the boiler on until it is over the maximum.  This hysteresis avoids cycling on/offf around
        // the minimum temp
        const hwTemperature: number = env.find((s) => s.id === "hw").reading;

        if (hwTemperature < program.minHWTemp ||
            (hwTemperature < program.maxHWTemp && current.hotWater)) {
            water = true;
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
