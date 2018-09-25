import * as Debug from "debug";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import {
    ControlStateSnapshot,
    IClock,
    IControllable,
    IController,
    IControllerSettings,
    IControlStrategy,
    IEnvironment,
    INJECTABLES,
    IOverrideManager,
    IProgramManager,
} from "./types";

const debug = Debug("app");

@injectable()
export class Controller implements IController {

    // stores the control state: eg heating OFF hot water ON
    private _currentControlState: ControlStateSnapshot;

    constructor(
        @inject(INJECTABLES.ControlStrategy) private strategy: IControlStrategy,
        @inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
        @inject(INJECTABLES.Environment) private environment: IEnvironment,
        @inject(INJECTABLES.ProgramManager) private _programManager: IProgramManager,
        @inject(INJECTABLES.Clock) private clock: IClock,
        @inject(INJECTABLES.OverrideManager) private overrideManager: IOverrideManager,
        @inject(INJECTABLES.System) private system: IControllable) {

        this.programManager.init();
        this._currentControlState = new ControlStateSnapshot(false, false);
    }

    public start(): void {
        this.refresh();

        if (this.settings.startPolling) {
            debug ("starting polling...");

            setInterval(() => {
                this.refresh();
            } , 10000);
        }
    }

    public getSnapshot(): ControlStateSnapshot {
        return this._currentControlState.clone();
    }

    // reveal for setOveride
    public setOverride(duration: number): void {
        this.overrideManager.setOverride(duration);
        this.refresh();
    }

    // reveal for clearOveride
    public clearOverride(): void {
        this.overrideManager.clearOverride();
        this.refresh();
    }

    // TO DO: consider moving the composition root higher to avoid this acessor
    public get programManager(): IProgramManager {
        return this._programManager;
    }

    // TO DO : make this private
    public refresh(): void {

        // move the clock on
        this.clock.tick();

        // remove any expired overrides
        this.overrideManager.refresh();

        this.environment.refresh();

        // get the new control stat
        this._currentControlState = this.strategy.calculateControlState(
            this.environment.getSnapshot(),
            this.programManager.getCurrentProgram(),
            this.getSnapshot(),
            this.overrideManager.getSnapshot());

        // apply it to the system
        this.system.applyControlState(this.getSnapshot());
    }
}
