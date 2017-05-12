import { IEnvironment, IControllerSettings, IProgram, Sensors, TYPES } from "../../src/controller/types";
import { Controller } from "../../src/controller/controller";
//import { MockEnvironment, MockProgram, MockControllerSettings } from "./mocks";

import { container } from "../inversify.config";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

const environment: IEnvironment = container.get<IEnvironment>(TYPES.IEnvironment);
const settings: IControllerSettings = container.get<IControllerSettings>(TYPES.IControllerSettings);
const program: IProgram = container.get<IControllerSettings>(TYPES.IControllerSettings);

describe("controller", () => {

    it("should construct", () => {
        const controller = new Controller(settings, environment, program)
    });

    it("should return summary info", () => {
        const controller = new Controller(settings, environment, program);
        const summary = controller.getSummary();

        expect(summary).to.be.not.null;
    });
});