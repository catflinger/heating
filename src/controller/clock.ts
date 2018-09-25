import { inject, injectable } from "inversify";
import * as moment from "moment";

import { IClock, IControllerSettings, INJECTABLES } from "./types";

@injectable()
export class Clock implements IClock {

    protected now: moment.Moment = moment();

    @inject(INJECTABLES.SlotsPerDay)
    protected slotsPerDay: number;

    constructor() {
        this.now = moment();
    }

    public get currentSlot(): number {
        const minutesElapsed: number = this.now.hour() * 60 + this.now.minute();

        return Math.floor(minutesElapsed / this.minutesPerSlot());
    }

    public getDate(): Date {
        return this.now.toDate();
    }

    public tick(): void {
        this.now = moment();
    }

    public isToday(date: Date): boolean {
        return this.now.isSame(date, "day");
    }

    public get dayOfWeek(): number {
        return this.now.isoWeekday();
    }

    public isYesterday(date: Date): boolean {
        const yesterday = this.now.clone().subtract(1, "day");
        return yesterday.isSame(date, "day");
    }

    protected minutesPerSlot(): number {
        return (24 * 60) / this.slotsPerDay;
    }
}
