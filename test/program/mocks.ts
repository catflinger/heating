import { injectable } from "inversify";
import {IControllerSettings, INJECTABLES } from "../../src/controller/types";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    public slotsPerDay: number = 10;
}