import { injectable } from "inversify";

import {IControllerSettings, IClock } from "../../src/controller/types";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    public slotsPerDay: number = 10;
}

@injectable()
export class MockClock implements IClock {
    public slotNumber: number = 0; // Mock current time, to be set by tests

    public get currentSlot(): number {
        return this.slotNumber;
    }
}