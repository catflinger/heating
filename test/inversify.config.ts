import { Container } from "inversify";
import { IControllerSettings, IEnvironment, IProgram, TYPES } from "../src/controller/types";

import { MockControllerSettings, MockEnvironment, MockProgram } from "./controller/mocks";

export const container = new Container();

container.bind<IControllerSettings>(TYPES.IControllerSettings).to(MockControllerSettings);
container.bind<IEnvironment>(TYPES.IEnvironment).to(MockEnvironment);
container.bind<IProgram>(TYPES.IProgram).to(MockProgram);