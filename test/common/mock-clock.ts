import { inject, injectable } from "inversify";
import * as moment from "moment";

import { IControllerSettings, INJECTABLES } from "../../src/controller/types";
import { Clock } from "../../src/controller/clock";

@injectable()
export class MockClock extends Clock {
    @inject(INJECTABLES.SlotsPerDay) protected slotsPerDay: number;

    public setSlotNumber(slot: number) {
        this.now = moment(this.now)
            .startOf("day")
            .add(slot * 24 * 60 / this.slotsPerDay, "minutes")
            .toDate();
    }

    public addSlots(duration: number) {
        this.now = moment(this.now)
            .add(duration * 24 * 60 / this.slotsPerDay, "minutes")
            .toDate();
    }
}
