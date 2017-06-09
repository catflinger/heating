import { IControllerSettings, OverrideSnapshot, INJECTABLES, IOverride } from "../../src/controller/types";
import { Override } from "../../src/controller/override";
import { container } from "./inversify.config.test";

import { MockClock } from "../common/mock-clock";
import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let override: IOverride = container.get<IOverride>(INJECTABLES.Override);
let clock: MockClock = container.get<MockClock>(INJECTABLES.Clock);

describe("Override", () => {

    clock.setSlotNumber(0);

    it("should start with no override set", () => {
        const snap: OverrideSnapshot = override.getSnapshot();
        expect(snap).to.be.null;
    });

    it("should set an override", () => {
        override.setOverride(3);
        const snap: OverrideSnapshot = override.getSnapshot();
        expect(snap).not.to.be.null;

        expect(snap.duration).to.equal(3);
        expect(snap.start).to.equal(0);
        expect(snap.state).to.equal(true);
        expect(clock.isToday(snap.date)).to.be.true;
    });

    it("should clear an override", () => {
        override.clearOverride();
        const snap: OverrideSnapshot = override.getSnapshot();
        expect(snap).to.be.null;
    });

    it("should set an override mid-day", () => {
        clock.setSlotNumber(2);
        override.setOverride(2);

        const snap: OverrideSnapshot = override.getSnapshot();
        expect(snap).not.to.be.null;

        expect(snap.duration).to.equal(2);
        expect(snap.start).to.equal(2);
        expect(snap.state).to.equal(true);
    });


    it("should extend an override", () => {
        clock.setSlotNumber(3);
        override.setOverride(2);

        const snap: OverrideSnapshot = override.getSnapshot();
        expect(snap).not.to.be.null;

        expect(snap.duration).to.equal(4);
        expect(snap.start).to.equal(2);
        expect(snap.state).to.equal(true);
    });

    it("should not remove a current override", () => {
        override.refresh();

        const snap: OverrideSnapshot = override.getSnapshot();
        expect(snap).not.to.be.null;

        expect(snap.duration).to.equal(4);
        expect(snap.start).to.equal(2);
        expect(snap.state).to.equal(true);
    });

    it("should remove an expired override", () => {
        clock.setSlotNumber(9);
        override.refresh();

        const snap: OverrideSnapshot = override.getSnapshot();
        expect(snap).to.be.null;
    });


    it("should extend an override past midnight", () => {
        let snap: OverrideSnapshot;

        // set an override just before midnight
        override.clearOverride();
        clock.setSlotNumber(9);
        override.setOverride(3);

        // check it has been set OK
        snap = override.getSnapshot();
        expect(snap).not.to.be.null;
        expect(snap.duration).to.equal(3);
        expect(snap.start).to.equal(9);
        expect(snap.state).to.equal(true);

        // check it is not expired after a refresh
        override.refresh();
        snap = override.getSnapshot();
        expect(snap).not.to.be.null;
        expect(clock.isToday(snap.date)).to.be.true;

        // move the clock and check that the override is carried over into next day
        clock.addSlots(4);
        override.refresh();
        snap = override.getSnapshot();

        expect(snap).not.to.be.null;
        expect(snap.duration).to.equal(2);
        expect(snap.start).to.equal(0);
        expect(snap.state).to.equal(true);
        expect(clock.isToday(snap.date)).to.be.true;
    });

});

