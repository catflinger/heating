import { inject, injectable } from "inversify";
import { IClock, IControllerSettings, INJECTABLES, IOverrideManager, OverrideSnapshot } from "./types";

/*
Note: this implementation of the override manager is limited to at most one override.
Creating a new override will delete any existing override.
Overrides are immutable.
A future implementation may possibly allow multiple concurrent overrides.
*/

@injectable()
export class OverrideManager implements IOverrideManager {

    @inject(INJECTABLES.SlotsPerDay)
    protected slotsPerDay: number;

    @inject(INJECTABLES.Clock)
    private clock: IClock;

    private overrides: OverrideSnapshot[] = [];

    // clears out any expired overrides
    public refresh(): void {

        // if we don't have an override then nothing to do
        if (this.overrides.length === 0) {
            return;
        }

        const override: OverrideSnapshot = this.overrides[0];

        // see if the override is for yesterday
        if (this.clock.isYesterday(override.date)) {

            // clear the collection and start afresh
            this.overrides = [];

            // see if it spans midgnight and so overflows into the following day
            const overflow: number = override.start + override.duration - this.slotsPerDay;

            if (overflow > 0) {
                // create a new override for today with the remaining time
                this.overrides.push(new OverrideSnapshot(0, overflow, true, this.clock.getDate()));
            }

        // see if we have an override for today
        } else if (this.clock.isToday(override.date)) {

            // see if it has already expired
            if (override.start + override.duration < this.clock.currentSlot) {
                // no longer relevant, delete it
                this.overrides = [];
            }

        } else {

            // if we get this far then the overide is no longer relevant, remove it
            this.overrides = [];
        }
    }

    // get any current and active override for today (may return null)
    public getSnapshot(): OverrideSnapshot {
        if (this.overrides.length > 0) {
            return this.overrides[0].clone();
        } else {
            return null;
        }
    }

    public setOverride(duration: number): void {
        // create a new override
        this.overrides = [];
        this.overrides.push(new OverrideSnapshot(this.clock.currentSlot, duration, true, this.clock.getDate()));
    }

    public clearOverride() {
        this.overrides = [];
    }
}
