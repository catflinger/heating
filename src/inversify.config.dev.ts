import { Container, interfaces } from "inversify";
import "reflect-metadata";

import { ControllerSettingsDev } from "./server/controller-settings-dev";
import { EnvironmentSettingsDev } from "./server/environment-settings-dev";

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
    IOverride,
    IProgram,
    IProgramManager,
    IProgramStore,
    ISwitchable,
} from "./controller/types";

import { Utils } from "./common/utils";

import { BasicControlStrategy } from "./controller/basic-control-strategy";
import { Clock } from "./controller/clock";
import { Controller } from "./controller/controller";
import { Boiler } from "./controller/devices/boiler";
import { CHPump } from "./controller/devices/ch-pump";
import { HWPump } from "./controller/devices/hw-pump";
import { Environment } from "./controller/environment";
import { Override } from "./controller/override";
import { Program } from "./controller/program";
import { ProgramManager } from "./controller/program-manager";
import { System } from "./controller/system";
import { ControlApi } from "./server/api/control-api";
import { ProgramApi } from "./server/api/program-api";
import { StatusApi } from "./server/api/status-api";
import { ProgramStore } from "./controller/program-store";

export const container = new Container();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);

// singletons
container.bind<IController>(INJECTABLES.Controller).to(Controller).inSingletonScope();
container.bind<IControlStrategy>(INJECTABLES.ControlStrategy).to(BasicControlStrategy).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(ControllerSettingsDev).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(Environment).inSingletonScope();
container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettingsDev).inSingletonScope();
container.bind<IProgramStore>(INJECTABLES.ProgramStore).to(ProgramStore).inSingletonScope();
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(Clock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System).inSingletonScope();
container.bind<IOverride>(INJECTABLES.Override).to(Override).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(Boiler).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(CHPump).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(HWPump).inSingletonScope();
container.bind<Utils>(INJECTABLES.Utils).to(Utils).inSingletonScope();

// server config
container.bind<IApi>(INJECTABLES.ControlApi).to(ControlApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.ProgramApi).to(ProgramApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.StatusApi).to(StatusApi).inSingletonScope();

// discrete instances
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// factory methods
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
    .toFactory<IProgram>((context: interfaces.Context) => {
        return () => {
            return context.container.get<IProgram>(INJECTABLES.Program);
        };
    });
