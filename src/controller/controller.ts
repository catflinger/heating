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
    IProgram,
    ISwitchable,
    TYPES } from "./types";

export class Controller {
    private boiler: ISwitchable;
    private strategy: IControlStrategy;

    constructor(
        @inject(TYPES.IControllerSettings) private settings: IControllerSettings,
        @inject(TYPES.IEnvironment) private environment: IEnvironment,
        @inject(TYPES.IProgram) private program: IProgram) {

            // TO DO: inject this
            this.strategy = new BasicControlStrategy();
    }

    public getSummary(): any {
        return {};
    }

    public refresh(): void {
        // get snaphot of the control state
        const currentState: ControlStateSnapshot = this.getControlState();

        // get snapshot of the environment
        const env: EnvironmentSnapshot = this.environment.getSnapshot();

        // get the new control state
        const newState: ControlStateSnapshot = this.strategy.calculateControlState(this.program, currentState, env);

        // apply the new control state
        // TO DO:
    }

    private getControlState(): ControlStateSnapshot {
        return new ControlStateSnapshot();
    }
}
