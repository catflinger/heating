import { IControllerSettings, ISwitchable, INJECTABLES } from "../../src/controller/types";
import { Switchable } from "../../src/controller/switchable";
import { container } from "./inversify.config.test";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let settings: IControllerSettings;
let switchable: ISwitchable;

describe("Boiler", () => {
    before(() => {
        settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
        switchable = container.get<ISwitchable>(INJECTABLES.Boiler);
    });

    it("should construct", () => {
        expect(switchable).not.to.be.undefined;
    });

    // the rest of these test are testing Switchable rather than Boiler, so need not be repeated for CHPump and HWPump

    it("should not read from an uninitialised pin", () => {
        expect(() => switchable.state).to.throw;
        expect(() => switchable.switch).to.throw;
        expect(() => switchable.toggle).to.throw;
    });

    it("should initialise", () => {
        // initialsie the boiler pin
        switchable.init();

        expect(switchable.state).to.be.false;
    });

    it("should toggle the state", () => {
        expect(switchable.state).to.be.false;
        switchable.toggle();
        expect(switchable.state).to.be.true;
        switchable.toggle();
        expect(switchable.state).to.be.false;
    });

    it("should set the state", () => {
        expect(switchable.state).to.be.false;
        switchable.switch(true);
        expect(switchable.state).to.be.true;
        switchable.switch(true);
        expect(switchable.state).to.be.true;
        switchable.switch(false);
        expect(switchable.state).to.be.false;
    });
    
});

describe("Central Heating Pump", () => {
    before(() => {
        settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
        switchable = container.get<ISwitchable>(INJECTABLES.CHPump);
    });

    it("should construct", () => {
        expect(switchable).not.to.be.undefined;
    });
});

describe("Hot Water Pump", () => {
    before(() => {
        settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
        switchable = container.get<ISwitchable>(INJECTABLES.HWPump);
    });

    it("should construct", () => {
        expect(switchable).not.to.be.undefined;
    });
});
