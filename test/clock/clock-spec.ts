import { INJECTABLES } from "../../src/controller/types";
import { Clock } from "../../src/controller/clock";
import { container } from "./inversify.config.test";
import { MockClock } from "../common/mock-clock";
import * as moment from "moment";

import * as chai from "chai";
import "mocha";
const expect = chai.expect;

let clock: MockClock = container.get<MockClock>(INJECTABLES.Clock);
let slotsPerDay: number = container.get<number>(INJECTABLES.SlotsPerDay);

describe("clock", () => {

    it("should give the time", () => {
        expect(typeof clock.getDate().getMonth).to.equal("function");
    });

    it("should give current slot number", () => {
        let slot:  number = clock.currentSlot;

        expect(slot).to.be.greaterThan(-1);
        expect(slot).to.be.lessThan(slotsPerDay);
    });

    it("should test a date is for today", () => {
        let soon: Date = moment().add(20, "minutes").toDate();

        expect(clock.isToday(soon)).to.be.true;
        expect(clock.isYesterday(soon)).to.be.false;
    });

    it("should test a date is for yesterday", () => {
        let soon: Date = moment().subtract(1, "days").toDate();

        expect(clock.isToday(soon)).to.be.false;
        expect(clock.isYesterday(soon)).to.be.true;
    });

});
