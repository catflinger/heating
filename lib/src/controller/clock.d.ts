import { IClock } from "./types";
export declare class Clock implements IClock {
    protected now: Date;
    protected slotsPerDay: number;
    readonly currentSlot: number;
    getDate(): Date;
    tick(): void;
    isToday(date: Date): boolean;
    readonly dayOfWeek: number;
    isYesterday(date: Date): boolean;
    protected minutesPerSlot(): number;
}
