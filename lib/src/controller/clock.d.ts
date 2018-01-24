import { IClock } from "./types";
export declare class Clock implements IClock {
    protected now: Date;
    protected slotsPerDay: number;
    readonly currentSlot: number;
    getDate(): Date;
    tick(): void;
    isToday(date: Date): boolean;
    isYesterday(date: Date): boolean;
    protected minutesPerSlot(): number;
    private isSameDay(date1, date2);
}
