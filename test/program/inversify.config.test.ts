import { Container } from "inversify";

import { IControllerSettings, IProgram, INJECTABLES } from "../../src/types";
import { Program } from "../../src/program"; 
import { MockControllerSettings } from "./mocks";

export const container = new Container();

container.bind<IProgram>(INJECTABLES.Program).to(Program).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
