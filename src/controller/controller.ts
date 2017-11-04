import { Container, inject } from "inversify";
import "reflect-metadata";

import { BasicControlStrategy } from "./basic-control-strategy";

import {
    ControlStateSnapshot,
    IClock,
    IControllable,
    IController,
    IControllerSettings,
    IControlStrategy,
    IEnvironment,
    INJECTABLES,
    IOverride,
    IProgram,
    Snapshot,
} from "./types";

export class Controller implements IController {

    // stores the control state: eg heating OFF hot water ON
    private currentControlState: ControlStateSnapshot;
    private strategy: IControlStrategy;
    private settings: IControllerSettings;
    private environment: IEnvironment;
    private program: IProgram;
    private clock: IClock;
    private override: IOverride;
    private system: IControllable;

    constructor(container: Container) {
        this.currentControlState = new ControlStateSnapshot(false, false);

        this.strategy = container.get<IControlStrategy>(INJECTABLES.ControlStrategy);
        this.settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
        this.environment = container.get<IEnvironment>(INJECTABLES.Environment);
        this.program = container.get<IProgram>(INJECTABLES.Program);
        this.clock = container.get<IClock>(INJECTABLES.Clock);
        this.override = container.get<IOverride>(INJECTABLES.Override);
        this.system = container.get<IControllable>(INJECTABLES.System);
    }

    public start(): void {
        this.system.start();

        // TO DO: start the environment polling...
    }

    public getSnapshot(): Snapshot {
        return new Snapshot(
            this.currentControlState.clone(),
            this.environment.getSnapshot(),
            this.system.getDevicelState(),
            this.override.getSnapshot(),
            this.program.getSnapshot());
    }

    // reveal for setOveride
    public setOverride(duration: number): void {
        this.override.setOverride(duration);
    }

    // reveal for clearOveride
    public clearOverride(): void {
        this.override.clearOverride();
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
