import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IController, IControllerSettings, IEnvironment, IProgram, ISwitchable, TYPES } from "./types";

export class Controller {
    // private devices: Array<ISwitchable> = [];

    private boiler: ISwitchable;

    constructor(
        @inject(TYPES.IControllerSettings) private settings: IControllerSettings,
        @inject(TYPES.IEnvironment) private environment: IEnvironment,
        @inject(TYPES.IProgram) private program: IProgram) {
    }

    public getSummary(): any {
        return {};
    }
}
