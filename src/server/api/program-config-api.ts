import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import { DatedProgram } from "../../controller/dated-program";
import { ProgramConfig } from "../../controller/program-config";
import { IApi, IController, INJECTABLES } from "../../controller/types";

const debug = Debug("app");

@injectable()
export class ProgramConfigApi implements IApi {

    @inject(INJECTABLES.Controller)
    private controller: IController;

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    public addRoutes(router: Router): void {

        router.get("/program-config", (req, res, next) => {
            debug("GET: program-config");
            try {
                const result: any = this.controller.programManager.getConfig();

                return res.json(result);

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.put("/program-config", (req, res, next) => {
            debug("PUT: program-config");

            const config = new ProgramConfig();

            try {
                config.saturdayProgramId = req.body.saturdayProgramId;
                config.sundayProgramId = req.body.sundayProgramId;
                config.weekdayProgramId = req.body.weekdayProgramId;

                req.body.datedPrograms.forEach((dp: any) => {
                    if (dp.programId && dp.activationDate) {
                        config.datedPrograms.push(new DatedProgram(dp.programId, dp.activationDate));
                    }
                });

                if (!this.controller.programManager.configIsValid(config)) {
                    return res.status(422).send("program config invalid");
                }

            } catch (e) {
                return res.status(401).send("invalid request " + e);
            }

            try {

                this.controller.programManager.setConfig(config);

                // define of API response
                const result: any = { result: "OK" };
                this.utils.dumpTextFile("override-set.json", JSON.stringify(result));

                return res.json(result);

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }

        });
    }
}
