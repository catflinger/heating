import { IController, ISwitchable, INJECTABLES } from "../../src/controller/types";
import { container } from "./inversify.config.test";
import { MockControlStrategy, MockBoiler, MockHWPump, MockCHPump } from "./mocks";
import { IClean, TestingInjectables } from "../common/injectables-test";

container.get<IClean>(TestingInjectables.Clean).clean({});

import * as chai from "chai";
import "mocha";
const expect = chai.expect;

const controller: IController = container.get<IController>(INJECTABLES.Controller);
const mockStrategy: MockControlStrategy = container.get<MockControlStrategy>(INJECTABLES.ControlStrategy);

const boiler: ISwitchable = container.get<ISwitchable>(INJECTABLES.Boiler);
const hwPump: ISwitchable = container.get<ISwitchable>(INJECTABLES.HWPump);
const chPump: ISwitchable = container.get<ISwitchable>(INJECTABLES.CHPump);

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
        /*
        //off
        mockStrategy.water = false;
        mockStrategy.heating = false;
        controller.refresh();

        expect(boiler.state).to.be.false;
        expect(hwPump.state).to.be.false;
        expect(chPump.state).to.be.false;
        */

        //hot water only
        mockStrategy.water = true;
        mockStrategy.heating = false;

        controller.refresh();

        expect(boiler.getState()).to.be.true;
        expect(hwPump.getState()).to.be.true;
        expect(chPump.getState()).to.be.false;
/*
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
*/
    });
});