import { injectable } from "inversify";
import {IEnvironmentSettings, INJECTABLES } from "../../src/controller/types";

@injectable()
export class MockEnvironmentSettings implements IEnvironmentSettings {
    sensors: any[] = [];
    oneWireDirectory: string = __dirname + "/data";
}