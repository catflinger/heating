import { IControllerSettings, IProgram, IProgramStore, ProgramConfig } from "./types";
export declare class ProgramStore implements IProgramStore {
    private settings;
    private programFactory;
    private _ext;
    constructor(settings: IControllerSettings, programFactory: () => IProgram);
    init(): void;
    reset(): void;
    getConfig(): ProgramConfig;
    getPrograms(): IProgram[];
    saveConfig(config: ProgramConfig): void;
    savePrograms(programs: IProgram[]): void;
    private makeProgramPath(id);
    private readonly configPath;
}
