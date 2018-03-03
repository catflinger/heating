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

        router.get("/program", (req, res, next) => {
            debug("GET: programs");

            try {
                const programs: any[] = [];

                // make a list of program data to return
                this.programManager.listPrograms().forEach((p) => {
                    programs.push(p.toStorable());
                });

                const result = { items: programs };

                this.utils.dumpTextFile("programs.json", JSON.stringify(result));
                res.json(result);

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/program/:program_id", (req, res, next) => {
            debug("GET: program:program_id");

            const programId: string = req.params.program_id;

            try {
                const program: IProgram = this.programManager.getProgram(programId);

                if (program) {
                    const result: any = program.toStorable();
                    this.utils.dumpTextFile("program.json", JSON.stringify(result));

                    return res.json(result);
                } else {
                    return res.status(404).send("program not found");
                }

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.post("/program/:program_id", (req, res, next) => {
            debug("POST: program");

            try {
                this.programManager.updateProgram(req.body);
                return res.json({result: true});
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.put("/program", (req, res, next) => {
            debug("PUT: program");

            try {
                const program = this.programManager.createProgram(req.body);
                return res.json(program.toStorable());
            } catch (e) {
                debug("PUT ERROR: " + e);
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.delete("/program/:program_id", (req, res, next) => {
            debug("DELETE: program");

            const id: string = req.params.program_id;

            try {
                this.programManager.removeProgram(id);
                return res.json({result: true});
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
    }
}
