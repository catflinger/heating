import { Container } from "inversify";

import { IProgram, INJECTABLES } from "../../src/controller/types";
import { Program } from "../../src/controller/program"; 
//import { MockControllerSettings } from "../common/mock-controller-settings";

export const container = new Container();

container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<IProgram>(INJECTABLES.Program).to(Program).inSingletonScope();
//container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
