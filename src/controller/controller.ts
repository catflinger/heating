import * as Debug from "debug";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { BasicControlStrategy } from "./basic-control-strategy";
import { ProgramSnapshot } from "./snapshots/program-snapshot";

import {
    ControlStateSnapshot,
    DeviceStateSnapshot,
    EnvironmentSnapshot,
    IClock,
    IControllable,
    IController,
    IControllerSettings,
    IControlStrategy,
    IEnvironment,
    INJECTABLES,
    IOverrideManager,
    IProgram,
    IProgramManager,
    OverrideSnapshot,
    Snapshot,
} from "./types";

import { ControllerSnapshot } from "./snapshots/controllerSnapshot";

const debug = Debug("app");

@injectable()
export class Controller implements IController {

    // stores the control state: eg heating OFF hot water ON
    private currentControlState: ControlStateSnapshot;

    constructor(
        @inject(INJECTABLES.ControlStrategy) private strategy: IControlStrategy,
        @inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
        @inject(INJECTABLES.Environment) private environment: IEnvironment,
        @inject(INJECTABLES.ProgramManager) private _programManager: IProgramManager,
        @inject(INJECTABLES.Clock) private clock: IClock,
        @inject(INJECTABLES.OverrideManager) private overrideManager: IOverrideManager,
        @inject(INJECTABLES.System) private system: IControllable) {

        this.programManager.init();
        this.currentControlState = new ControlStateSnapshot(false, false);
    }

    public start(): void {
        this.environment.refresh();

        if (this.settings.startPolling) {
            debug ("starting environment polling...");

            setInterval(() => {
                this.environment.refresh();
            } , 10000);
        }
    }

    public getSnapshot(): Snapshot {
        return new Snapshot(
            this.currentControlState.clone(),
            this.environment.getSnapshot(),
            this.system.getDeviceState(),
            new ControllerSnapshot(
                this.overrideManager.getSnapshot(),
                this.programManager.currentProgram.getSnapshot()));
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

    // TO DO TODO : make this private
    public refresh(): void {

        // move the clock on
        this.clock.tick();

        // remove any expired overrides
        this.overrideManager.refresh();

        this.environment.refresh();

        // get the new control stat
        this.currentControlState = this.strategy.calculateControlState(this.getSnapshot());

        // apply it to the system
        this.system.applyControlState(this.currentControlState.clone());
    }
}
