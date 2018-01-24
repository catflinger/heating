// import { EINPROGRESS } from "constants";
import { inject, injectable } from "inversify";
import { Program } from "./program";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IControllerSettings, INJECTABLES, IProgram, IProgramManager } from "./types";

const db = require("diskdb");

@injectable()
export class ProgramManager implements IProgramManager {

    private _activeProgram: IProgram = undefined;

    constructor(
        @inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
        @inject(INJECTABLES.ProgramFactory) private programFactory: () => IProgram ) {

        // TO DO: get the last used program
        // this._activeProgram = new Program(settings.slotsPerDay);
    }

    get activeProgram(): IProgram {
        return this._activeProgram;
    }

    public list(): any[] {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.find();
    }

    public get(id: string): IProgram {
        let result: IProgram = null;

        db.connect(this.settings.programStore, ["programs"]);
        const storable = db.programs.findOne({_id: id});

        if (storable) {
            result = this.programFactory();
            result.loadFrom(storable);
        }
        return result;
    }

    public add(program: IProgram): string {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.save(program.toStorable());
    }

    public update(program: IProgram): string {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.update(program.toStorable());
    }

    public remove(id: string): void {
        db.connect(this.settings.programStore, ["programs"]);
        return db.programs.remove({_id: id});
    }
}
