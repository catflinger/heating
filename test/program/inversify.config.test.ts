import { Container } from "inversify";

import { IProgram, INJECTABLES } from "../../src/controller/types";
import { Program } from "../../src/controller/program"; 
export const container = new Container();

container.bind<IProgram>(INJECTABLES.Program).to(Program).inSingletonScope();
