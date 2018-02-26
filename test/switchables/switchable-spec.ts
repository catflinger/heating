import { IControllerSettings, ISwitchable, INJECTABLES } from "../../src/controller/types";
import { Switchable } from "../../src/controller/switchable";
import { container } from "./inversify.config.test";

import * as chai from "chai";
import "mocha";
import { IClean, TestingInjectables } from "../common/injectables-test";

container.get<IClean>(TestingInjectables.Clean).clean({});

const expect = chai.expect;

let switchables: any[] = [
    { 
        testName: "boiler",
        device: container.get<ISwitchable>(INJECTABLES.Boiler),
        expectedName: "Boiler"
    },
    { 
        testName: "heating pump",
        device: container.get<ISwitchable>(INJECTABLES.CHPump),
        expectedName: "Central Heating Pump"
    },
    { 
        testName: "hot water pump",
        device: container.get<ISwitchable>(INJECTABLES.HWPump),
        expectedName: "Hot Water Pump"
    },
];

switchables.forEach((test:any) => {
    describe(test.testName, () => {
        before(() => {
        });

        it("should construct", () => {
            expect(test.device).not.to.be.undefined;
        });

        it("should be named correctly", () => {
            expect(test.device.name).equals(test.expectedName);
        });

        it("should toggle the state", () => {
            expect(test.device.state).to.be.false;
            test.device.toggle();
            expect(test.device.state).to.be.true;
            test.device.toggle();
            expect(test.device.state).to.be.false;
        });

        it("should set the state", () => {
            expect(test.device.state).to.be.false;
            test.device.switch(true);
            expect(test.device.state).to.be.true;
            test.device.switch(true);
            expect(test.device.state).to.be.true;
            test.device.switch(false);
            expect(test.device.state).to.be.false;
        });
    });
});

