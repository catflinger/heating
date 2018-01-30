import { IControllerSettings, IProgram, IProgramManager } from "./types";
export declare class ProgramManager implements IProgramManager {
    private settings;
    private programFactory;
    private _ext;
    private _activeProgram;
    constructor(settings: IControllerSettings, programFactory: () => IProgram);
    readonly activeProgram: IProgram;
    setActiveProgram(id: string): void;
    listPrograms(): IProgram[];
    getProgram(id: string): IProgram;
    createProgram(src: any): IProgram;
    saveProgram(program: IProgram): void;
    removeProgram(id: string): void;
    private makeProgramPath(id);
    private makeLatestIdPath();
    private setLatestProgamId(id);
    private getLatestProgamId();
}
