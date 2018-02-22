import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import {
    IApi,
    INJECTABLES,
    IProgram,
    IProgramManager,
} from "../../controller/types";

const debug = Debug("app");

@injectable()
export class ProgramApi implements IApi {

    @inject(INJECTABLES.ProgramManager)
    private programManager: IProgramManager;

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    public addRoutes(router: Router): void {

        router.get("/programs", (req, res, next) => {
            debug("GET: programs");

            try {
                const programs: any[] = [];

                // make a list of program data to return
                this.programManager.listPrograms().forEach((p) => {
                    programs.push(p.toStorable());
                });

                const result = {
                    config: {
                        saturday: this.programManager.saturdayProgram,
                        sunday: this.programManager.sundayProgram,
                        weekday: this.programManager.weekdayProgram,
                    },
                    programs,
                };

                this.utils.dumpTextFile("programs.json", JSON.stringify(result));
                res.json(result);

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/program/:program_id", (req, res, next) => {
            debug("GET: program:program_id");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

            const programId: string = req.params.program_id;

            try {
                const program: IProgram = this.programManager.getProgram(programId);

                if (program) {
                    const result: string = JSON.stringify({
                        program: program.toStorable(),
                    });
                    this.utils.dumpTextFile("program.json", result);
                    res.json(result);
                } else {
                    res.status(404).send("program not found");
                }

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.post("/program/:program_id", (req, res, next) => {
            debug("POST: program");

            try {
                this.programManager.updateProgram(req.body);
            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }

            res.json({result: true});
        });

        router.put("/program", (req, res, next) => {
            debug("PUT: program");

            let program: IProgram;

            try {
                program = this.programManager.createProgram(req.body);
            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }

            res.json(program.toStorable());

        });

        router.delete("/program/:program_id", (req, res, next) => {
            debug("DELETE: program");

            const id: string = req.query.get("program_id");

            try {
                this.programManager.removeProgram(id);
            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }

            res.json({result: true});
        });
    }
}
