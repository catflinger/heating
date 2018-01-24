import { inject, injectable } from "inversify";

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
        return this.isSameDay(date, this.now);
    }

    public isYesterday(date: Date): boolean {
        const yesterday: Date = new Date();

        yesterday.setDate(this.now.getDate() - 1);

        return this.isSameDay(date, yesterday);
    }

    protected minutesPerSlot(): number {
        return (24 * 60) / this.slotsPerDay;
    }

    private isSameDay(date1: Date, date2: Date): boolean {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDay() === date2.getDay());
    }
}
