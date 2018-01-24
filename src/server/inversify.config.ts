import { Container, interfaces } from "inversify";
import "reflect-metadata";

import { ControllerSettings } from "./controller-settings";
import { EnvironmentSettings } from "./environment-settings";

import {
    // the injectable interfaces
    IClock,
    IControllable,
    IController,
    IControllerSettings,
    IControlStrategy,
    IDigitalOutput,
    IEnvironment,
    IEnvironmentSettings,
    INJECTABLES,
    IOverride,
    IProgram,
    IProgramManager,
    ISwitchable,
} from "../controller/types";

import { BasicControlStrategy } from "../controller/basic-control-strategy";
import { Clock } from "../controller/clock";
import { Environment } from "../controller/environment";
import { Override } from "../controller/override";
import { Program } from "../controller/program";
import { ProgramManager } from "../controller/program-manager";
import { System } from "../controller/system";

export const container = new Container();

container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<IControlStrategy>(INJECTABLES.ControlStrategy).to(BasicControlStrategy).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(ControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(Environment).inSingletonScope();
container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettings).inSingletonScope();
container.bind<IProgram>(INJECTABLES.Program).to(Program);
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(Clock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System);
container.bind<IOverride>(INJECTABLES.Override).to(Override).inSingletonScope();

// bind INJECTABLES.ProgramFactory to a function that creates program objects
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
        .toFactory<IProgram>((context: interfaces.Context) => {
            return () => {
                return context.container.get<IProgram>(INJECTABLES.Program);
            };
        });
