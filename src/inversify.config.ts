import { Container, interfaces } from "inversify";
import "reflect-metadata";

import { ControllerSettings } from "./server/controller-settings";
import { EnvironmentSettings } from "./server/environment-settings";

import {
    // the injectable interfaces
    IApi,
    IClock,
    IControllable,
    IController,
    IControllerSettings,
    IControlStrategy,
    IDigitalOutput,
    IEnvironment,
    IEnvironmentSettings,
    INJECTABLES,
    IOverrideManager,
    IProgram,
    IProgramManager,
    ISwitchable,
} from "./controller/types";

import { BasicControlStrategy } from "./controller/basic-control-strategy";
import { Clock } from "./controller/clock";
import { Controller } from "./controller/controller";
import { Environment } from "./controller/environment";
import { OverrideManager } from "./controller/override-manager";
import { Program } from "./controller/program";
import { ProgramManager } from "./controller/program-manager";
import { System } from "./controller/system";
import { ProgramApi } from "./server/api/program-api";
import { ProgramConfigApi } from "./server/api/program-config-api";
import { StatusApi } from "./server/api/status-api";

import { Utils } from "./common/utils";
import { OverrideApi } from "./server/api/override-api";
import { App } from "./server/app";

export const container = new Container();

// server config
container.bind<IApi>(INJECTABLES.ProgramApi).to(ProgramApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.ProgramApi).to(ProgramApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.StatusApi).to(StatusApi).inSingletonScope();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);

// singletons
container.bind<App>(INJECTABLES.App).to(App).inSingletonScope();
container.bind<IController>(INJECTABLES.Controller).to(Controller).inSingletonScope();
container.bind<IControlStrategy>(INJECTABLES.ControlStrategy).to(BasicControlStrategy).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(ControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(Environment).inSingletonScope();
container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettings).inSingletonScope();
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(Clock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System).inSingletonScope();
container.bind<IOverrideManager>(INJECTABLES.OverrideManager).to(OverrideManager).inSingletonScope();
container.bind<Utils>(INJECTABLES.Utils).to(Utils).inSingletonScope();

// server config
container.bind<IApi>(INJECTABLES.ProgramConfigApi).to(ProgramConfigApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.ProgramApi).to(ProgramApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.StatusApi).to(StatusApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.OverrideApi).to(OverrideApi).inSingletonScope();

// discrete instances
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// factory methods
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
    .toFactory<IProgram>((context: interfaces.Context) => {
        return () => {
            return context.container.get<IProgram>(INJECTABLES.Program);
        };
    });
