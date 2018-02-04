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
    IOverride,
    IProgram,
    IProgramManager,
    OverrideSnapshot,
    Snapshot,
} from "./types";

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
        @inject(INJECTABLES.Override) private override: IOverride,
        @inject(INJECTABLES.System) private system: IControllable) {

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
        debug ("getting control state snapshot");
        const cs: ControlStateSnapshot = this.currentControlState.clone();

        debug ("getting environment state snapshot");
        const env: EnvironmentSnapshot = this.environment.getSnapshot();

        debug ("getting device state snapshot");
        const dev: DeviceStateSnapshot = this.system.getDeviceState();

        debug ("getting override state snapshot");
        const ov: OverrideSnapshot = this.override.getSnapshot();

        debug ("getting program state snapshot");
        const prog: ProgramSnapshot = this.programManager.activeProgram.getSnapshot();

        return new Snapshot(cs, env, dev, ov, prog);
    }

    // reveal for setOveride
    public setOverride(duration: number): void {
        this.override.setOverride(duration);
        this.refresh();
    }

    // reveal for clearOveride
    public clearOverride(): void {
        this.override.clearOverride();
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
        this.override.refresh();

        this.environment.refresh();

        // get the new control stat
        this.currentControlState = this.strategy.calculateControlState(this.getSnapshot());

        // apply it to the system
        this.system.applyControlState(this.currentControlState.clone());
    }
}
