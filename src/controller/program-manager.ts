import { inject, injectable } from "inversify";
import { Program } from "./program";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IClock, IControllerSettings, INJECTABLES, IProgram, IProgramManager, IProgramStore, ProgramConfig, ProgramMode } from "./types";

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

    public get weekdayProgram(): IProgram {
        return this._programs[ProgramMode.Weekday];
    }
    public get saturdayProgram(): IProgram {
        return this._programs[ProgramMode.Saturday];
    }
    public get sundayProgram(): IProgram {
        return this._programs[ProgramMode.Sunday];
    }

    public listPrograms(): IProgram[] {
        return this._programs;
    }

    get currentProgram(): IProgram {
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
        return this.getProgram(id);
    }

    public getConfig(): ProgramConfig {
        return Object.assign(new ProgramConfig(), this._config);
    }

    public setConfig(config: ProgramConfig) {

        // check that a program with this id exists before using it
        // if (!this.getProgram(id)) {
        //     throw new Error("program not found");
        // }
        // this._config.activeProgramIds[mode] = id;
        this.save();
    }

    public getProgram(id: string): IProgram {
        return this._programs.find((p) => p.id === id);
    }

    public createProgram(src: any): IProgram {

        // check that no id is supplied
        if (src && src.id) {
            throw new Error("cannot create new  program specifying specific id value");
        }

        // create the new program and save it to disk
        const program: IProgram = this.programFactory();
        program.loadFrom(src);
        this._programs.push(program);

        this.save();

        return program;
    }

    public updateProgram(data: any) {

        const program: IProgram = this.programFactory();
        program.loadFrom(data);

        // check that a program with this id exists
        const idx = this._programs.findIndex((p) => p.id === program.id);

        if (idx >= 0) {
            // remove existing program from the program array
            this._programs = this._programs.splice(idx, 1);

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

        // remove from the program array
        const idx = this._programs.findIndex((p) => p.id === id);
        if (idx >= 0) {
            this._programs = this._programs.splice(idx, 1);
        }

        this.save();
    }

    private save() {
        this.store.saveConfig(this._config);
        this.store.savePrograms(this._programs);
    }
}
