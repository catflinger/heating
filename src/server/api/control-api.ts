import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import { Validate } from "../../common/validate";
import { IApi, IController, INJECTABLES, ProgramConfig } from "../../controller/types";

const debug = Debug("app");

@injectable()
export class ControlApi implements IApi {

    @inject(INJECTABLES.Controller)
    private controller: IController;

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    public addRoutes(router: Router): void {

        router.get("/control/:id", (req, res, next) => {
            debug("GET/id: control");

            // define of API response
            res.json({
                items: [this.controller.programManager.getConfig()],
            });
        });

        router.get("/control", (req, res, next) => {
            debug("GET: control");

            // define of API response
            res.json(this.controller.programManager.getConfig());
        });

        router.post("/control/:id", (req, res, next) => {
            debug("POST: control");

            const weekdayId: string = req.params.weekdayId;
            const saturdayId: string = req.params.saturdayId;
            const sundayId: string = req.params.sundayId;

            // TO DO: check that the data is valid

            const config = new ProgramConfig();
            config.saturdayProgramId = saturdayId;
            config.sundayProgramId = sundayId;
            config.weekdayProgramId = weekdayId;

            this.controller.programManager.setConfig(config);

            // define of API response
            const result: any = { result: "OK"};
            this.utils.dumpTextFile("override-set.json", JSON.stringify(result));
            res.json(result);
        });

        router.put("/control/*", (req, res, next) => {
            res.status(405).send("method not allowed");
        });
        router.delete("/control/*", (req, res, next) => {
            res.status(405).send("method not allowed");
        });
    }
}
