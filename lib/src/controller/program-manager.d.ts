import { IClock, IControllerSettings, IProgram, IProgramManager, IProgramStore, ProgramMode } from "./types";
export declare class ProgramManager implements IProgramManager {
    private settings;
    private programFactory;
    private store;
    private clock;
    private _programs;
    private _config;
    constructor(settings: IControllerSettings, programFactory: () => IProgram, store: IProgramStore, clock: IClock);
    init(): void;
    readonly weekdayProgram: IProgram;
    readonly saturdayProgram: IProgram;
    readonly sundayProgram: IProgram;
    listPrograms(): IProgram[];
    readonly activeProgram: IProgram;
    setActiveProgram(mode: ProgramMode, id: string): void;
    getProgram(id: string): IProgram;
    createProgram(src: any): IProgram;
    updateProgram(data: any): void;
    removeProgram(id: string): void;
    private save();
}
