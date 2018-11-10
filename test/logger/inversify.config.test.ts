import { Container, interfaces } from "inversify";
import * as path from "path";
import { IController, IControllerSettings, IEnvironment, IOverrideManager, IProgram, ISwitchable, INJECTABLES, IControllable, IProgramManager, IProgramStore, ILogger, IEnvironmentSettings } from "../../src/controller/types";

import { MockController, MockControllerSettings, MockEnvironment, MockEnvironmentSettings } from "./mocks";
import { Logger } from "../../src/logger/logger";

export const container = new Container();

container.bind<string>(INJECTABLES.AppRootDir).toConstantValue(path.join(__dirname, "data"));
container.bind<string>(INJECTABLES.OneWireDir).toConstantValue(path.join(__dirname, "data", "1wire"));
// testing modules
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(MockEnvironment).inSingletonScope();
container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(MockEnvironmentSettings).inSingletonScope();
container.bind<IController>(INJECTABLES.Controller).to(MockController).inSingletonScope();
container.bind<Logger>(INJECTABLES.Logger).to(Logger).inSingletonScope();
