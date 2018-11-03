import { Container, interfaces } from "inversify";
import * as path from "path";
import { 
    IController,
    IControllerSettings,
    IEnvironment,
    INJECTABLES,
    IApi,
    IControlStrategy,
    IEnvironmentSettings,
    IProgramStore,
    IProgramManager,
    IClock,
    IControllable,
    IOverrideManager,
    ISwitchable,
    IProgram,
    ILogger,
 } from "../../../src/controller/types";

import { MockController, MockControllerSettings, MockEnvironment } from "./mocks";
import { Logger } from "../../../src/logger/logger";
import { App } from "../../../src/server/app";
import { ProgramConfigApi } from "../../../src/server/api/program-config-api";
import { ProgramApi } from "../../../src/server/api/program-api";
import { StatusApi } from "../../../src/server/api/status-api";
import { OverrideApi } from "../../../src/server/api/override-api";
import { SensorApi } from "../../../src/server/api/sensor-api";
import { Utils } from "../../../src/common/utils";
import { BasicControlStrategy } from "../../../src/controller/basic-control-strategy";
import { EnvironmentSettings } from "../../../src/server/environment-settings";
import { ProgramStore } from "../../../src/controller/program-store";
import { ProgramManager } from "../../../src/controller/program-manager";
import { Clock } from "../../../src/controller/clock";
import { System } from "../../../src/controller/system";
import { OverrideManager } from "../../../src/controller/override-manager";
import { Boiler } from "../../../src/controller/devices/boiler";
import { CHPump } from "../../../src/controller/devices/ch-pump";
import { HWPump } from "../../../src/controller/devices/hw-pump";
import { Program } from "../../../src/controller/program";
import { LoggerApi } from "../../../src/server/api/logger-api";

export const container = new Container();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<string>(INJECTABLES.AppRootDir).toConstantValue(path.join(__dirname, "data"));
container.bind<string>(INJECTABLES.OneWireDir).toConstantValue(path.join(__dirname, "data", "1wire"));

// singletons
container.bind<App>(INJECTABLES.App).to(App).inSingletonScope();
container.bind<IControlStrategy>(INJECTABLES.ControlStrategy).to(BasicControlStrategy).inSingletonScope();
container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettings).inSingletonScope();
container.bind<IProgramStore>(INJECTABLES.ProgramStore).to(ProgramStore).inSingletonScope();
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(Clock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System).inSingletonScope();
container.bind<IOverrideManager>(INJECTABLES.OverrideManager).to(OverrideManager).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(Boiler).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(CHPump).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(HWPump).inSingletonScope();
container.bind<Utils>(INJECTABLES.Utils).to(Utils).inSingletonScope();


// server config
container.bind<IApi>(INJECTABLES.ProgramConfigApi).to(ProgramConfigApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.ProgramApi).to(ProgramApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.StatusApi).to(StatusApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.OverrideApi).to(OverrideApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.SensorApi).to(SensorApi).inSingletonScope();
container.bind<IApi>(INJECTABLES.LogApi).to(LoggerApi).inSingletonScope();


// discrete instances
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// factory methods
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
    .toFactory<IProgram>((context: interfaces.Context) => {
        return () => {
            return context.container.get<IProgram>(INJECTABLES.Program);
        };
    });


// testing modules
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(MockEnvironment).inSingletonScope();
container.bind<IController>(INJECTABLES.Controller).to(MockController).inSingletonScope();
container.bind<Logger>(INJECTABLES.Logger).to(Logger).inSingletonScope();
