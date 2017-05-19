import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Switchable } from "./switchable";
import { IControllerSettings, INJECTABLES } from "./types";

@injectable()
export class Boiler extends Switchable {
    constructor(@inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings) {
        super("boiler", settings.boilerPin);
    }
}
