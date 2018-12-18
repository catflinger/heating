import { inject, injectable } from "inversify";

import { DatedProgram } from "./dated-program";
import { ProgramConfig } from "./program-config";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IClock, IControllerSettings, INJECTABLES, IProgram, IProgramManager, IProgramStore } from "./types";

@injectable()
export class ProgramManager implements IProgramManager {
    private _programs: IProgram[] = [];
    private _config: ProgramConfig;

    constructor(
        @inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
        @inject(INJECTABLES.ProgramFactory) private programFactory: () => IProgram,
        @inject(INJECTABLES.ProgramStore) private store: IProgramStore,
        @inject(INJECTABLES.Clock) private clock: IClock) { }

    public init(): void {
        try {
            this.store.init();
            this._config = this.store.getConfig();
            this._programs = this.store.getPrograms();
        } catch {
            // TO DO: notify the user here and ask what to do
            // for now just assume they want a factory reset

            // create some defaults
            const program: IProgram = this.programFactory();

            const config = new ProgramConfig();
            config.saturdayProgramId = program.id;
            config.sundayProgramId = program.id;
            config.weekdayProgramId = program.id;

            // reset the store and load defaults
            this.store.reset();
            this._programs.push(program);
            this._config = config;
            this.save();
        }
    }

    public listPrograms(): ProgramSnapshot[] {
        const result: ProgramSnapshot[] = [];
        this._programs.forEach((p: IProgram) => {
            result.push(p.getSnapshot());
        });
        return result;
    }

    public getCurrentProgram(): ProgramSnapshot {
        let id: string;

        // find the date and choose the right program
        switch (this.clock.dayOfWeek) {
            case 6:
                id = this._config.saturdayProgramId;
                break;
            case 7:
                id = this._config.sundayProgramId;
                break;
            default:
                id = this._config.weekdayProgramId;
                break;
        }

        // now see if there are any dated overrides to the basic config
        this._config.datedPrograms.forEach((dp: DatedProgram) => {
            if (this.clock.isToday(dp.activationDate)) {
                id = dp.programId;
            }
        });

        return this.getProgram(id);
    }

    public getConfig(): ProgramConfig {
        return Object.assign(new ProgramConfig(), this._config);
    }

    public configIsValid(config: ProgramConfig): boolean {
        if (!this.getProgram(config.saturdayProgramId)) {
            return false;
        }
        if (!this.getProgram(config.sundayProgramId)) {
            return false;
        }
        if (!this.getProgram(config.weekdayProgramId)) {
            return false;
        }
        return true;
    }

    public setConfig(config: ProgramConfig) {
        this._config = config;
        this.save();
    }

    public getProgram(id: string): ProgramSnapshot {
        const program: IProgram = this._programs.find((p) => p.id === id);
        return program ? program.getSnapshot() : null;
    }

    public createProgram(src: ProgramSnapshot): ProgramSnapshot {

        // create the new program and save it to disk
        const program: IProgram = this.programFactory();
        program.loadFromSnapshot(src);
        this._programs.push(program);

        this.save();

        return program.getSnapshot();
    }

    public updateProgram(src: ProgramSnapshot) {

        const program: IProgram = this.programFactory();
        program.loadFromSnapshot(src);

        // check that a program with this id exists
        const idx = this._programs.findIndex((p) => p.id === program.id);

        if (idx >= 0) {
            // remove existing program from the program array
            this._programs.splice(idx, 1);

            // add updated program back in
            this._programs.push(program);

            this.save();

        } else {
            throw new Error("Cannot find program to update");
        }
    }

    public removeProgram(id: string): void {

        // check the program is not being used
        if (id === this._config.saturdayProgramId ||
            id === this._config.sundayProgramId ||
            id === this._config.weekdayProgramId) {
            throw new Error("Cannot remove program as it is still in use");
        }

        this._config.datedPrograms.forEach((dp: DatedProgram) => {
            if (dp.programId === id) {
                throw new Error("Cannot remove program as it is still in use");
            }
        });

        // remove from the program array
        const idx = this._programs.findIndex((p) => p.id === id);
        if (idx >= 0) {
            this._programs.splice(idx, 1);
        }

        this.save();
    }

    private save() {
        this.store.saveConfig(this._config);
        this.store.savePrograms(this._programs);
    }
}
