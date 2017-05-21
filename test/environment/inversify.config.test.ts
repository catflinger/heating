import { Container } from "inversify";
//import "reflect-metadata";
import { IEnvironmentSettings, IEnvironment, INJECTABLES } from "../../src/types";
import { Environment } from "../../src/environment";
import { MockEnvironmentSettings } from "./mocks";

export const container = new Container();

container.bind<MockEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(MockEnvironmentSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(Environment).inSingletonScope();

