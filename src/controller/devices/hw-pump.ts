import * as Debug from "debug";
import { inject, injectable } from "inversify";

import { Switchable } from "../switchable";
import { IControllerSettings, INJECTABLES } from "../types";

const debug = Debug("app");

@injectable()
export class HWPump extends Switchable {
    constructor(@inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings) {
        super("hot water pump", settings.hwPumpPin);
    }
}
