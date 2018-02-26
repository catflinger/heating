import { IControllerSettings, OverrideSnapshot, INJECTABLES, IOverrideManager } from "../../src/controller/types";
import { OverrideManager } from "../../src/controller/override-manager";
import { container } from "./inversify.config.test";

import { MockClock } from "../common/mock-clock";
import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let override: IOverrideManager = container.get<IOverrideManager>(INJECTABLES.OverrideManager);
let clock: MockClock = container.get<MockClock>(INJECTABLES.Clock);

describe("Override", () => {

    clock.setSlotNumber(0);

    it("should start with no override set", () => {
        const snaps: OverrideSnapshot[] = override.getSnapshot();
        expect(Array.isArray(snaps)).to.be.true;
        expect(snaps.length).to.equal(0);
    });

    it("should set an override", () => {
        override.setOverride(3);
        const snaps: OverrideSnapshot[] = override.getSnapshot();
        expect(snaps.length).to.equal(1);

        expect(snaps[0].duration).to.equal(3);
        expect(snaps[0].start).to.equal(0);
        expect(snaps[0].state).to.equal(true);
        expect(clock.isToday(snaps[0].date)).to.be.true;
    });

    it("should clear an override", () => {
        override.clearOverride();
        const snaps: OverrideSnapshot[] = override.getSnapshot();
        expect(snaps.length).to.equal(0);
    });

    it("should set an override mid-day", () => {
        clock.setSlotNumber(2);
        override.setOverride(2);

        const snaps: OverrideSnapshot[] = override.getSnapshot();
        expect(snaps.length).to.equal(1);

        expect(snaps[0].duration).to.equal(2);
        expect(snaps[0].start).to.equal(2);
        expect(snaps[0].state).to.equal(true);
    });

    it("should not remove a current override", () => {
        override.refresh();

        const snaps: OverrideSnapshot[] = override.getSnapshot();
        expect(snaps.length).to.equal(1);

        expect(snaps[0].duration).to.equal(2);
        expect(snaps[0].start).to.equal(2);
        expect(snaps[0].state).to.equal(true);
    });

    it("should remove an expired override", () => {
        clock.setSlotNumber(9);
        override.refresh();

        const snaps: OverrideSnapshot[] = override.getSnapshot();
        expect(snaps.length).to.equal(0);
    });


    it("should extend an override past midnight", () => {
        let snaps: OverrideSnapshot[];

        // set an override just before midnight
        override.clearOverride();
        clock.setSlotNumber(9);
        override.setOverride(3);

        // check it has been set OK
        snaps = override.getSnapshot();
        expect(snaps.length).to.equal(1);
        expect(snaps[0].duration).to.equal(3);
        expect(snaps[0].start).to.equal(9);
        expect(snaps[0].state).to.equal(true);

        // check it is not expired after a refresh
        override.refresh();
        snaps = override.getSnapshot();
        expect(snaps.length).to.equal(1);
        expect(clock.isToday(snaps[0].date)).to.be.true;

        // move the clock and check that the override is carried over into next day
        clock.addSlots(2);
        override.refresh();
        snaps = override.getSnapshot();

        expect(snaps.length).to.equal(1);
        expect(snaps[0].duration).to.equal(2);
        expect(snaps[0].start).to.equal(0);
        expect(snaps[0].state).to.equal(true);
        expect(clock.isToday(snaps[0].date)).to.be.true;
    });

});

