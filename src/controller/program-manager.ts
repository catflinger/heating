// import { EINPROGRESS } from "constants";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as path from "path";
import { Program } from "./program";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IControllerSettings, INJECTABLES, IProgram, IProgramManager } from "./types";

@injectable()
export class ProgramManager implements IProgramManager {
    private _ext: string = ".json";
    private _activeProgram: IProgram = undefined;

    constructor(@inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
                @inject(INJECTABLES.ProgramFactory) private programFactory: () => IProgram) {

        // get the last used program
        const latestId = this.getLatestProgamId();
        if (latestId) {

            const prog = this.getProgram(latestId);
            if (prog) {
                this._activeProgram = prog;
                this.setLatestProgamId(this._activeProgram.id);
            }
        }

        // check it loaded
        if (!this._activeProgram) {

            // no last used so start off with a new default program
            this._activeProgram = this.programFactory();
            this._activeProgram.loadDefaults();
            this.saveProgram(this._activeProgram);
            this.setLatestProgamId(this._activeProgram.id);
        }
    }

    get activeProgram(): IProgram {
        return this._activeProgram;
    }

    public setActiveProgram(id: string) {
        const program: IProgram = this.getProgram(id);

        if (program) {
            this._activeProgram = program;
            this.setLatestProgamId(id);
        }
    }

    public listPrograms(): IProgram[] {
        const results: IProgram[] = [];
        const files: string[]  = fs.readdirSync(path.join(this.settings.programStoreDir, "programs"));
        const ids: string[] = [];

        // get a list of all program file ids
        files.forEach((f: string) => {
            if (f.endsWith(this._ext)) {
                ids.push(f.substr(0, f.length - this._ext.length));
            }
        });

        // create a program object from each id
        ids.forEach((id) => {
            results.push(this.getProgram(id));
        });

        return results;
    }

    public getProgram(id: string): IProgram {
        let result: IProgram = null;

        try {
            const json: string = fs.readFileSync(this.makeProgramPath(id), "utf8");

            result = this.programFactory();
            result.loadFromJson(json);

        } catch (e) {
            result = null;
        }

        return result;
    }

    public createProgram(src: any): IProgram {

        // check that no id is supplied
        if (src && src.id) {
            throw new Error("cannot create new  program specifying specific id value");
        }

        // create the new program and save it to disk
        const program: IProgram = this.programFactory();
        program.loadFrom(src);
        this.saveProgram(program);

        return program;
    }

    public saveProgram(program: IProgram) {
        // write the file to disk
        fs.writeFileSync(this.makeProgramPath(program.id), program.toJson());
    }

    public removeProgram(id: string): void {

        if (this._activeProgram != null && this._activeProgram.id !== id) {
            const filepath: string = this.makeProgramPath(id);

            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        } else {
            // do not remove the active program
        }
    }

    private makeProgramPath(id: string): string {
        return path.join(this.settings.programStoreDir, "programs", id + this._ext);
    }

    private makeLatestIdPath() {
        return path.join(this.settings.programStoreDir, "latest-program.json");
    }

    private setLatestProgamId(id: string): void {
        fs.writeFileSync(this.makeLatestIdPath(), JSON.stringify({latest: id}));
    }

    private getLatestProgamId(): string {
        let result: string = null;

        if (fs.existsSync(this.makeLatestIdPath())) {
            const config: any = JSON.parse(fs.readFileSync(this.makeLatestIdPath(), "utf8"));
            result = config.latest;
        }
        return result;
    }
}
