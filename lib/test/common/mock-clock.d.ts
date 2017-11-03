import { Clock } from "../../src/controller/clock";
export declare class MockClock extends Clock {
    setSlotNumber(slot: number): void;
    addSlots(duration: number): void;
}
