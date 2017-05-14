import { IController, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors, Snapshot, INJECTABLES } from "../../src/controller/types";
import { Controller } from "../../src/controller/controller";
import { container } from "../inversify.config.test";

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

        expect(summary.control.boiler).to.be.false;
        expect(summary.control.hwPump).to.be.false;
        expect(summary.control.chPump).to.be.false;

    });

    it("should refresh the current control state", () => {
        let summary: Snapshot = controller.getSnapshot();

        expect(summary.control.boiler).to.be.false;
        expect(summary.control.hwPump).to.be.false;
        expect(summary.control.chPump).to.be.false;

        controller.refresh();

        summary = controller.getSnapshot();

        expect(summary.control.boiler).to.be.true;
        expect(summary.control.hwPump).to.be.true;
        expect(summary.control.chPump).to.be.true;
    });

});