import { Container, interfaces } from "inversify";
import * as path from "path";
import "reflect-metadata";

import {
    // the injectable interfaces
    IApi,
    IClock,
    IControllable,
    IController,
    IControllerSettings,
    IControlStrategy,
    IEnvironment,
    IEnvironmentSettings,
    ILogger,
    INJECTABLES,
    IOverrideManager,
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
import { OverrideManager } from "./controller/override-manager";
import { Program } from "./controller/program";
import { ProgramManager } from "./controller/program-manager";
import { ProgramStore } from "./controller/program-store";
import { System } from "./controller/system";
import { Logger } from "./logger/logger";
import { LoggerApi } from "./server/api/logger-api";
import { OneWireApi } from "./server/api/one-wire-api";
import { OverrideApi } from "./server/api/override-api";
import { ProgramApi } from "./server/api/program-api";
import { ProgramConfigApi } from "./server/api/program-config-api";
import { SensorApi } from "./server/api/sensor-api";
import { StatusApi } from "./server/api/status-api";
import { App } from "./server/app";
import { ControllerSettings } from "./server/controller-settings";
import { EnvironmentSettings } from "./server/environment-settings";

export const container = new Container();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(6 * 24);
// when this runs through "npm run start" on dev machine expect __dirname to be of the form your_project_dir/lib/src
container.bind<string>(INJECTABLES.AppRootDir).toConstantValue(path.join(__dirname, "..", "..", "dev"));
container.bind<string>(INJECTABLES.GpioRootDir).toConstantValue(path.join(__dirname, "..", "..", "dev", "gpio"));
container.bind<string>(INJECTABLES.OneWireDir).toConstantValue(path.join(__dirname, "..", "..", "dev", "1wire"));

// singletons
container.bind<App>(INJECTABLES.App).to(App).inSingletonScope();
container.bind<IController>(INJECTABLES.Controller).to(Controller).inSingletonScope();
container.bind<IControlStrategy>(INJECTABLES.ControlStrategy).to(BasicControlStrategy).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(Environment).inSingletonScope();
container.bind<IProgramStore>(INJECTABLES.ProgramStore).to(ProgramStore).inSingletonScope();
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(Clock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System).inSingletonScope();
container.bind<IOverrideManager>(INJECTABLES.OverrideManager).to(OverrideManager).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(Boiler).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(CHPump).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(HWPump).inSingletonScope();
container.bind<Utils>(INJECTABLES.Utils).to(Utils).inSingletonScope();
container.bind<ILogger>(INJECTABLES.Logger).to(Logger).inSingletonScope();
container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettings).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(ControllerSettings).inSingletonScope();

// server config
container.bind<IApi>(INJECTABLES.ProgramConfigApi).to(ProgramConfigApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.ProgramApi).to(ProgramApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.StatusApi).to(StatusApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.OverrideApi).to(OverrideApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.SensorApi).to(SensorApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.LogApi).to(LoggerApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.OneWireApi).to(OneWireApi).inSingletonScope();

// discrete instances
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// factory methods
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
    .toFactory<IProgram>((context: interfaces.Context) => {
        return () => {
            return context.container.get<IProgram>(INJECTABLES.Program);
        };
    });
