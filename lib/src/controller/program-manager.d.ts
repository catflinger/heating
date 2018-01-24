import { IControllerSettings, IProgram, IProgramManager } from "./types";
export declare class ProgramManager implements IProgramManager {
    private settings;
    private programFactory;
    private _activeProgram;
    constructor(settings: IControllerSettings, programFactory: () => IProgram);
    readonly activeProgram: IProgram;
    list(): any[];
    get(id: string): IProgram;
    add(program: IProgram): string;
    update(program: IProgram): string;
    remove(id: string): void;
}
