import "reflect-metadata";
import { IClock, IControllable, IController, IControllerSettings, IControlStrategy, IEnvironment, IOverride, IProgramManager, Snapshot } from "./types";
export declare class Controller implements IController {
    private strategy;
    private settings;
    private environment;
    private _programManager;
    private clock;
    private override;
    private system;
    private currentControlState;
    constructor(strategy: IControlStrategy, settings: IControllerSettings, environment: IEnvironment, _programManager: IProgramManager, clock: IClock, override: IOverride, system: IControllable);
    start(): void;
    getSnapshot(): Snapshot;
    setOverride(duration: number): void;
    clearOverride(): void;
    readonly programManager: IProgramManager;
    refresh(): void;
}
