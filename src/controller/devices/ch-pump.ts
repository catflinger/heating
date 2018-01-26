import * as Debug from "debug";
import { inject, injectable } from "inversify";

import { Switchable } from "../switchable";
import { IControllerSettings, INJECTABLES } from "../types";

const debug = Debug("app");

@injectable()
export class CHPump extends Switchable {
    constructor(@inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings) {
        super();
        this.name = "Central Heating Pump";
        this.gpioPath = settings.chPumpPath;
    }
}
