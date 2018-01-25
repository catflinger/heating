// import { EINPROGRESS } from "constants";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as path from "path";
import { v4 as guid } from "uuid";
import { Program } from "./program";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IControllerSettings, INJECTABLES, IProgram, IProgramManager } from "./types";

@injectable()
export class ProgramManager implements IProgramManager {
    private ext: string = ".json";
    private _activeProgram: IProgram = undefined;

    constructor(@inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
                @inject(INJECTABLES.ProgramFactory) private programFactory: () => IProgram) {

        this._activeProgram = this.programFactory();

        // TO DO: get the last used program here
    }

    get activeProgram(): IProgram {
        return this._activeProgram;
    }

    public list(): IProgram[] {
        const results: IProgram[] = [];
        const files: string[]  = fs.readdirSync(this.settings.programStore);
        const ids: string[] = [];

        // get a list of all program file ids
        files.forEach((f: string) => {
            if (f.endsWith(this.ext)) {
                ids.push(f.substr(0, f.length - this.ext.length));
            }
        });

        // create a program object from each id
        ids.forEach((id) => {
            results.push(this.get(id));
        });

        return results;
    }

    public get(id: string): IProgram {
        let result: IProgram = null;

        try {
            const json: string = fs.readFileSync(this.makePath(id), "utf8");
            result = this.programFactory();
            result.loadFrom(json);

        } catch {
            result = null;
        }

        return result;
    }

    public save(program: IProgram): string {
        let result: string = null;

        try {
            // create a new id if needed
            let id: string = program.id;
            if (!id) {
                id = guid();
            }

            // write the file to disk
            fs.writeFileSync(this.makePath(id), program.toStorable());

            // return the id of the program newly created
            result = id;

        } catch {
            result = null;
        }

        return result;
    }

    public remove(id: string): void {

        if (this._activeProgram != null && this._activeProgram.id !== id) {
            const filepath: string = this.makePath(id);

            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        } else {
            // do not remove the active program
        }
    }

    private makePath(id: string): string {
        return path.format({
            ext: this.ext,
            name: id,
            root: this.settings.programStore,
        });
    }
}
