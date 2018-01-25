import { IControllerSettings, IProgram, IProgramManager } from "./types";
export declare class ProgramManager implements IProgramManager {
    private settings;
    private programFactory;
    private ext;
    private _activeProgram;
    constructor(settings: IControllerSettings, programFactory: () => IProgram);
    readonly activeProgram: IProgram;
    list(): IProgram[];
    get(id: string): IProgram;
    save(program: IProgram): string;
    remove(id: string): void;
    private makePath(id);
}
