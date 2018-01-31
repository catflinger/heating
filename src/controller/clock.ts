import { inject, injectable } from "inversify";
import * as moment from "moment";

import { IClock, IControllerSettings, INJECTABLES } from "./types";

@injectable()
export class Clock implements IClock {

    protected now: Date = new Date();

    @inject(INJECTABLES.SlotsPerDay)
    protected slotsPerDay: number;

    public get currentSlot(): number {
        const minutesElapsed: number = this.now.getHours() * 60 + this.now.getMinutes();

        return Math.floor(minutesElapsed / this.minutesPerSlot());
    }

    public getDate(): Date {
        return new Date(this.now);
    }

    public tick(): void {
        this.now = new Date();
    }

    public isToday(date: Date): boolean {
        return moment(this.now).isSame(date, "day");
    }

    public isYesterday(date: Date): boolean {
        const yesterday = moment(this.now).subtract(1, "day");
        return yesterday.isSame(date, "day");
    }

    protected minutesPerSlot(): number {
        return (24 * 60) / this.slotsPerDay;
    }
}
