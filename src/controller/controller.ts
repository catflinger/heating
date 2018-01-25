import * as Debug from "debug";
import { Container, inject } from "inversify";
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

export class Controller implements IController {

    // stores the control state: eg heating OFF hot water ON
    private currentControlState: ControlStateSnapshot;
    private strategy: IControlStrategy;
    private settings: IControllerSettings;
    private environment: IEnvironment;
    private programManager: IProgramManager;
    private clock: IClock;
    private override: IOverride;
    private system: IControllable;

    constructor(container: Container) {
        this.currentControlState = new ControlStateSnapshot(false, false);

        this.strategy = container.get<IControlStrategy>(INJECTABLES.ControlStrategy);
        this.settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
        this.environment = container.get<IEnvironment>(INJECTABLES.Environment);
        this.programManager = container.get<IProgramManager>(INJECTABLES.ProgramManager);
        this.clock = container.get<IClock>(INJECTABLES.Clock);
        this.override = container.get<IOverride>(INJECTABLES.Override);
        this.system = container.get<IControllable>(INJECTABLES.System);
    }

    public start(): void {
        this.environment.refresh();

        debug ("starting environment polling...");

        setInterval(() => {
            this.environment.refresh();
        } , 10000);
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
