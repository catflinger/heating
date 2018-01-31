import { IController, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors, Snapshot, INJECTABLES } from "../../src/controller/types";
import { Controller } from "../../src/controller/controller";
import { container } from "./inversify.config.test";
import { MockEnvironment, MockControlStrategy, MockDevice } from "./mocks";
import { MockClock } from "../common/mock-clock";

import * as chai from "chai";
import "mocha";
const expect = chai.expect;

let controller: Controller = new Controller(container);
let mockStrategy: MockControlStrategy = container.get<MockControlStrategy>(INJECTABLES.ControlStrategy);
let mockEnvironment: MockEnvironment =  container.get<MockEnvironment>(INJECTABLES.Environment);
let clock: MockClock = container.get<MockClock>(INJECTABLES.Clock);

let boiler: MockDevice = container.get<MockDevice>(INJECTABLES.Boiler);
let hwPump: MockDevice = container.get<MockDevice>(INJECTABLES.HWPump);
let chPump: MockDevice = container.get<MockDevice>(INJECTABLES.CHPump);

boiler.name = "boiler";
hwPump.name = "hot water pump";
chPump.name = "chPump";

const hwTempBelowThreshold = 30;
const hwTempInsideThreshold = 45;
const hwTempAboveThreshold = 55;

// everything at or returned to starting values
// note: this state should only exist temporarily at start-up
const testDataDefault: any = {
    control: { heating: false, hotWater: false },
    device: { boiler: false, hwPump: false, chPump: false },
    environment: { hwTemperature: hwTempBelowThreshold }
}

function compareState(expected: any, actual: Snapshot) {
    expect(actual.control.heating).to.equal(expected.control.heating, "incorrect value for heating state");
    expect(actual.control.hotWater).to.equal(expected.control.hotWater, "incorrect value for water state");
    expect(actual.device.boiler).to.equal(expected.device.boiler, "incorrect value for boiler state");
    expect(actual.device.hwPump).to.equal(expected.device.hwPump, "incorrect value for hw pump state");
    expect(actual.device.chPump).to.equal(expected.device.chPump, "incorrect value for ch pump state");
    expect(actual.environment.hwTemperature).to.equal(expected.environment.hwTemperature, "failed to return correct environment");
}

describe("controller", () => {

    it("should construct", () => {
        expect(() => controller.start()).not.to.throw;
    });

    it("should initialise", () => {
        expect(controller).not.to.be.undefined;
    });

    it("should return summary info", () => {
        mockEnvironment.setHWTemperature(30);
        const summary: Snapshot = controller.getSnapshot();
        compareState(testDataDefault, summary);
    });

    it("should not set an override with bad data", () => {       
        expect( () => controller.setOverride(undefined)).to.throw;
        expect( () => controller.setOverride(NaN)).to.throw;
        expect( () => controller.setOverride(-1)).to.throw;
    });

    it("should correctly map control state to device state", () => {
        let summary: Snapshot;
        
        //off
        mockStrategy.water = false;
        mockStrategy.heating = false;
        controller.refresh();
        summary = controller.getSnapshot();

        expect(summary.device.boiler).to.be.false;
        expect(summary.device.hwPump).to.be.false;
        expect(summary.device.chPump).to.be.false;

        //hot water only
        mockStrategy.water = true;
        mockStrategy.heating = false;
        controller.refresh();
        summary = controller.getSnapshot();

        expect(summary.device.boiler).to.be.true;
        expect(summary.device.hwPump).to.be.true;
        expect(summary.device.chPump).to.be.false;

        //heating only
        mockStrategy.water = false;
        mockStrategy.heating = true;
        controller.refresh();
        summary = controller.getSnapshot();

        expect(summary.device.boiler).to.be.true;
        expect(summary.device.hwPump).to.be.false;
        expect(summary.device.chPump).to.be.true;

        //both
        mockStrategy.water = true;
        mockStrategy.heating = true;
        controller.refresh();
        summary = controller.getSnapshot();

        expect(summary.device.boiler).to.be.true;
        expect(summary.device.hwPump).to.be.true;
        expect(summary.device.chPump).to.be.true;
    });
});