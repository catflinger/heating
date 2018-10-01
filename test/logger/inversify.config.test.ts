import { Container, interfaces } from "inversify";
import { IController, IControllerSettings, IEnvironment, IOverrideManager, IProgram, ISwitchable, INJECTABLES, IControllable, IProgramManager, IProgramStore, ILogger } from "../../src/controller/types";

import { MockController, MockControllerSettings, MockEnvironment } from "./mocks";
import { Logger } from "../../src/logger/logger";

export const container = new Container();

// testing modules
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(MockEnvironment).inSingletonScope();
container.bind<IController>(INJECTABLES.Controller).to(MockController).inSingletonScope();
container.bind<Logger>(INJECTABLES.Logger).to(Logger).inSingletonScope();
