import { IController, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors, INJECTABLES, ControlStateSnapshot } from "../../src/controller/types";
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

    it("should not set an override with bad data", () => {       
        expect( () => controller.setOverride(undefined)).to.throw;
        expect( () => controller.setOverride(NaN)).to.throw;
        expect( () => controller.setOverride(-1)).to.throw;
    });

    it("should correctly map control state to device state", () => {
        
        //off
        mockStrategy.water = false;
        mockStrategy.heating = false;
        controller.refresh();

        expect(boiler.state).to.be.false;
        expect(hwPump.state).to.be.false;
        expect(chPump.state).to.be.false;

        //hot water only
        mockStrategy.water = true;
        mockStrategy.heating = false;
        controller.refresh();

        expect(boiler.state).to.be.true;
        expect(hwPump.state).to.be.true;
        expect(chPump.state).to.be.false;

        //heating only
        mockStrategy.water = false;
        mockStrategy.heating = true;
        controller.refresh();

        expect(boiler.state).to.be.true;
        expect(hwPump.state).to.be.false;
        expect(chPump.state).to.be.true;

        //both
        mockStrategy.water = true;
        mockStrategy.heating = true;
        controller.refresh();

        expect(boiler.state).to.be.true;
        expect(hwPump.state).to.be.true;
        expect(chPump.state).to.be.true;
    });
});