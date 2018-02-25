import { IClock, IControllerSettings, IProgram, IProgramManager, IProgramStore, ProgramConfig } from "./types";
export declare class ProgramManager implements IProgramManager {
    private settings;
    private programFactory;
    private store;
    private clock;
    private _programs;
    private _config;
    constructor(settings: IControllerSettings, programFactory: () => IProgram, store: IProgramStore, clock: IClock);
    init(): void;
    listPrograms(): IProgram[];
    readonly currentProgram: IProgram;
    getConfig(): ProgramConfig;
    configIsValid(config: ProgramConfig): boolean;
    setConfig(config: ProgramConfig): void;
    getProgram(id: string): IProgram;
    createProgram(src: any): IProgram;
    updateProgram(data: any): void;
    removeProgram(id: string): void;
    private save();
}
