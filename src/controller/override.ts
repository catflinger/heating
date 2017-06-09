import { inject, injectable } from "inversify";
import { IClock, IControllerSettings, INJECTABLES, IOverride, OverrideSnapshot } from "./types";

@injectable()
export class Override implements IOverride {
    private override: OverrideSnapshot = null;

    @inject(INJECTABLES.Clock)
    private clock: IClock;

    @inject(INJECTABLES.ControllerSettings)
    private setttings: IControllerSettings;

    // clears out any expired overrides
    public refresh(): void {

        // if we don't have an override then nothing to do
        if (!this.override) {
            return;

            // see if the override is for yesterday
        } else if (this.clock.isYesterday(this.override.date)) {

            // seee if it spans midgnight and so overflows into the following day
            const overflow: number = this.override.start + this.override.duration - this.setttings.slotsPerDay;

            if (overflow > 0) {

                // create a new override for today with the remaining time
                this.override = new OverrideSnapshot(0, overflow, true, this.clock.getDate());

            } else {

                // this override is expired
                this.override = null;
            }

            // see if we have an override for today
        } else if (this.clock.isToday(this.override.date)) {

            // see if it has already expired
            if (this.override.start + this.override.duration < this.clock.currentSlot) {
                this.override = null;
            }

        } else {

            // if we get this far then the overide is no longer relevant, remove it
            this.override = null;
        }
    }

    // get any current and active override for today (may return null)
    public getSnapshot(): OverrideSnapshot {
        if (this.override) {
            return this.override.clone();
        } else {
            return null;
        }
    }

    public setOverride(duration: number): void {
        if (this.override) {
            // bump the current override along some
            this.override = new OverrideSnapshot(this.override.start, this.override.duration + duration, true, this.override.date);
        } else {
            // create a new override
            this.override = new OverrideSnapshot(this.clock.currentSlot, duration, true, this.clock.getDate());
        }
    }

    public clearOverride() {
        this.override = null;
    }
}
