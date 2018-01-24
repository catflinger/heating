import { Clock } from "../../src/controller/clock";
export declare class MockClock extends Clock {
    protected slotsPerDay: number;
    setSlotNumber(slot: number): void;
    addSlots(duration: number): void;
}
