import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import {
    IApi,
    IEnvironment,
    INJECTABLES,
} from "../../controller/types";

const debug = Debug("app");

@injectable()
export class OneWireApi implements IApi {

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    @inject(INJECTABLES.Environment)
    private environment: IEnvironment;

    public addRoutes(router: Router): void {

        router.get("/onewire", (req, res, next) => {
            debug("GET: onewire");

            try {
                this.environment.findOneWireDevices((err, list) => {
                    if (!err) {
                        res.json({
                            devices: list,
                        });
                    } else {
                        res.status(500).send("could not get a list of sensors");
                    }
                });
            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

    }
}
