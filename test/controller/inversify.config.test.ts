import { Container } from "inversify";

import { Controller } from "../../src/controller/controller";
import { IController, IControllerSettings, IEnvironment, IProgram, ISwitchable, INJECTABLES } from "../../src/controller/types";

import { MockDevice, MockControllerSettings, MockEnvironment, MockProgram } from "./mocks";

export const container = new Container();

container.bind<IController>(INJECTABLES.Controller).to(Controller).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(MockEnvironment).inSingletonScope();
container.bind<IProgram>(INJECTABLES.Program).to(MockProgram).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(MockDevice).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(MockDevice).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(MockDevice).inSingletonScope();
