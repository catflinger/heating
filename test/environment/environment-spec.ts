import {
    EnvironmentSnapshot,
    IEnvironment,
    INJECTABLES,
} from "../../src/types";

import { Environment } from "../../src/environment";

import { container } from "./inversify.config.test";

import * as chai from "chai";
import "mocha";
const expect = chai.expect;

let environment: IEnvironment = container.get<IEnvironment>(INJECTABLES.Environment);

describe("environment", () => {
    it("should read hot water sensor", () => {
        let snapshot: EnvironmentSnapshot = environment.getSnapshot();
        expect(snapshot.hwTemperature).to.equal(34);
    });
});
