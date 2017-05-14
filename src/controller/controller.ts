import { inject, injectable } from "inversify";
import "reflect-metadata";

import { BasicControlStrategy } from "./basic-control-strategy";
import {
    ControlStateSnapshot,
    EnvironmentSnapshot,
    IController,
    IControllerSettings,
    IControlStrategy,
    IEnvironment,
    INJECTABLES,
    IProgram,
    ISwitchable,
    Snapshot,
} from "./types";

@injectable()
export class Controller implements IController {
    private strategy: IControlStrategy;

    @inject(INJECTABLES.ControllerSettings)
    private settings: IControllerSettings;

    @inject(INJECTABLES.Environment)
    private environment: IEnvironment;

    @inject(INJECTABLES.Program)
    private program: IProgram;

    @inject(INJECTABLES.Boiler)
    private boiler: ISwitchable;

    @inject(INJECTABLES.HWPump)
    private hwPump: ISwitchable;

    @inject(INJECTABLES.CHPump)
    private chPump: ISwitchable;

    constructor() {

        // TO DO: should we inject thisor not?
        this.strategy = new BasicControlStrategy();
    }

    public getSnapshot(): Snapshot {
        return new Snapshot(
            this.getControlState(),
            this.environment.getSnapshot());
    }

    public refresh(): void {

        // get the new control state
        const newState: ControlStateSnapshot = this.strategy.calculateControlState(this.program, this.getSnapshot());

        // apply the new control state
        this.boiler.switch(newState.boiler);
        this.hwPump.switch(newState.hwPump);
        this.chPump.switch(newState.chPump);
    }

    private getControlState(): ControlStateSnapshot {
        return new ControlStateSnapshot(
            this.boiler.state,
            this.hwPump.state,
            this.chPump.state);
    }
}
