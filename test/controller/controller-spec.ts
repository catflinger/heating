import { IController, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors, Snapshot, INJECTABLES } from "../../src/controller/types";
import { Controller } from "../../src/controller/controller";
import { container } from "./inversify.config.test";
import { MockEnvironment } from "./mocks";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let controller: IController;

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

// hot water cool
const testDataA: any = {
    control: { heating: false, hotWater: true },
    device: { boiler: true, hwPump: true, chPump: false },
    environment: { hwTemperature: hwTempBelowThreshold }
}

// hot water being heated
const testDataB: any = {
    control: { heating: false, hotWater: true },
    device: { boiler: true, hwPump: true, chPump: false },
    environment: { hwTemperature: hwTempInsideThreshold }
}

// hot water fully heated
const testDataC: any = {
    control: { heating: false, hotWater: false },
    device: { boiler: false, hwPump: false, chPump: false },
    environment: { hwTemperature: hwTempAboveThreshold }
}

// hot water cooling
const testDataD: any = {
    control: { heating: false, hotWater: false },
    device: { boiler: false, hwPump: false, chPump: false },
    environment: { hwTemperature: hwTempInsideThreshold }
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

    before(() => {
        controller = container.get<IController>(INJECTABLES.Controller);
    });

    it("should construct", () => {
        expect(controller).to.be.not.null;
    });

    it("should return summary info", () => {
        const summary: Snapshot = controller.getSnapshot();
        compareState(testDataDefault, summary);
    });

    describe("when controlling hot water", () => {
        let env: MockEnvironment = container.get<MockEnvironment>(INJECTABLES.Environment);
        let summary: Snapshot;

        it("should heat the water when cool", () => {

            env.setHWTemperature(hwTempBelowThreshold);
            controller.refresh();
            summary = controller.getSnapshot();

            // temp is too low so boiler should be on
            compareState(testDataA, summary);

        });

        it("should heat the water when already warm", () => {
            env.setHWTemperature(hwTempInsideThreshold);
            controller.refresh();
            summary = controller.getSnapshot();

            // temp is between thresholds on the way up so boiler should be on
            compareState(testDataB, summary);
        });
        
        it("should not heat the water when already hot", () => {

            env.setHWTemperature(hwTempAboveThreshold);
            controller.refresh();
            summary = controller.getSnapshot();

            // temp is high so boiler should be off
            compareState(testDataC, summary);
        });
        
        it("should not heat the water when warm but cooling fom hot", () => {

            env.setHWTemperature(hwTempInsideThreshold);
            controller.refresh();
            summary = controller.getSnapshot();

            // temp is between thresholds on the way down so boiler should be off
            compareState(testDataD, summary);
        });
        
        it("should heat the water when cool again", () => {

            env.setHWTemperature(hwTempBelowThreshold);
            controller.refresh();
            summary = controller.getSnapshot();

            // temp is low again so boiler should be back on
            compareState(testDataA, summary);    
        });
    });
});