import { IController, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors, Snapshot, INJECTABLES } from "../../src/controller/types";
import { Controller } from "../../src/controller/controller";
import { container } from "../inversify.config.test";
import { MockEnvironment } from "./mocks";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let controller: IController;

describe("controller", () => {

    before(() => {
        controller = container.get<IController>(INJECTABLES.Controller);
    });

    it("should construct", () => {
        expect(controller).to.be.not.null;
    });

    it("should return summary info", () => {
        const summary: Snapshot = controller.getSnapshot();

        expect(summary.control.boiler).to.equal(false, "incorrect value for boiler state");
        expect(summary.control.hwPump).to.equal(false, "incorrect value for hw pump state");
        expect(summary.control.chPump).to.equal(false, "incorrect value for ch pump state");
        expect(summary.environment.hwTemperature).to.equal(30, "failed to return correct environment");

    });

    it("should refresh the current control state", () => {
        let env: MockEnvironment = container.get<MockEnvironment>(INJECTABLES.Environment);
        let summary: Snapshot;

        controller.refresh();
        summary = controller.getSnapshot();

        // temp is too low so boiler should be on
        expect(summary.control.boiler).to.equal(true, "incorrect value for boiler state (1)");
        expect(summary.control.hwPump).to.equal(true, "incorrect value for hw pump state (1)");
        expect(summary.control.chPump).to.equal(false, "incorrect value for ch pump state (1)");

        env.setHWTemperature(45);
        controller.refresh();
        summary = controller.getSnapshot();

        // temp is between thresholds on the way up so boiler should be on
        expect(summary.control.boiler).to.equal(true, "incorrect value for boiler state (2)");
        expect(summary.control.hwPump).to.equal(true, "incorrect value for hw pump state (2)");
        expect(summary.control.chPump).to.equal(false, "incorrect value for ch pump state (2)");

        env.setHWTemperature(55);
        controller.refresh();
        summary = controller.getSnapshot();

        // temp is high so boiler should be off
        expect(summary.control.boiler).to.equal(false, "incorrect value for boiler state (3)");
        expect(summary.control.hwPump).to.equal(false, "incorrect value for hw pump state (3)");
        expect(summary.control.chPump).to.equal(false, "incorrect value for ch pump state (3)");

        env.setHWTemperature(45);
        controller.refresh();
        summary = controller.getSnapshot();

        // temp is between thresholds on the way down so boiler should be off
        expect(summary.control.boiler).to.equal(false, "incorrect value for boiler state (4)");
        expect(summary.control.hwPump).to.equal(false, "incorrect value for hw pump state (4)");
        expect(summary.control.chPump).to.equal(false, "incorrect value for ch pump state (4)");

        env.setHWTemperature(39);
        controller.refresh();
        summary = controller.getSnapshot();

        // temp is low again so boiler should be on
        expect(summary.control.boiler).to.equal(true, "incorrect value for boiler state (5)");
        expect(summary.control.hwPump).to.equal(true, "incorrect value for hw pump state (5)");
        expect(summary.control.chPump).to.equal(false, "incorrect value for ch pump state (5)");
    });

});