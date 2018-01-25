import * as Debug from "debug";
import { inject, injectable } from "inversify";

import { Switchable } from "../switchable";
import { IControllerSettings, INJECTABLES } from "../types";

const debug = Debug("app");

@injectable()
export class Boiler extends Switchable {
    constructor(@inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings) {
        super("boiler", settings.boilerPin);
    }
}
