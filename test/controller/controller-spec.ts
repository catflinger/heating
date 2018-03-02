import { IController, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors, SummarySnapshot, INJECTABLES } from "../../src/controller/types";
import { Controller } from "../../src/controller/controller";
import { container } from "./inversify.config.test";
import { MockEnvironment, MockControlStrategy, MockDevice } from "./mocks";
import { MockClock } from "../common/mock-clock";
import { IClean, TestingInjectables } from "../common/injectables-test";

container.get<IClean>(TestingInjectables.Clean).clean({});


import * as chai from "chai";
import "mocha";
const expect = chai.expect;

let controller: IController = container.get<IController>(INJECTABLES.Controller);
let mockStrategy: MockControlStrategy = container.get<MockControlStrategy>(INJECTABLES.ControlStrategy);
let mockEnvironment: MockEnvironment =  container.get<MockEnvironment>(INJECTABLES.Environment);
let clock: MockClock = container.get<MockClock>(INJECTABLES.Clock);
const settings: IControllerSettings = container.get(INJECTABLES.ControllerSettings);

let boiler: MockDevice = container.get<MockDevice>(INJECTABLES.Boiler);
let hwPump: MockDevice = container.get<MockDevice>(INJECTABLES.HWPump);
let chPump: MockDevice = container.get<MockDevice>(INJECTABLES.CHPump);

boiler.name = "boiler";
hwPump.name = "hot water pump";
chPump.name = "chPump";

const hwTempBelowThreshold = 30;
const hwTempInsideThreshold = 45;
const hwTempAboveThreshold = 55;

describe("controller", () => {

    it("should construct", () => {
        expect(() => controller.start()).not.to.throw;
    });

    it("should initialise", () => {
        expect(controller).not.to.be.undefined;
    });

    it("should return summary info", () => {
        mockEnvironment.setHWTemperature(30);
        const summary: SummarySnapshot = controller.getSnapshot();
        expect(summary.control.heating).to.equal(false, "incorrect value for heating state");
        expect(summary.control.hotWater).to.equal(false, "incorrect value for water state");
        expect(summary.device.boiler).to.equal(false, "incorrect value for boiler state");
        expect(summary.device.hwPump).to.equal(false, "incorrect value for hw pump state");
        expect(summary.device.chPump).to.equal(false, "incorrect value for ch pump state");
        expect(summary.environment.getSensor("hw").reading).to.equal(hwTempBelowThreshold, "failed to return correct environment");
        });

    it("should not set an override with bad data", () => {       
        expect( () => controller.setOverride(undefined)).to.throw;
        expect( () => controller.setOverride(NaN)).to.throw;
        expect( () => controller.setOverride(-1)).to.throw;
    });

    it("should correctly map control state to device state", () => {
        let summary: SummarySnapshot;
        
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