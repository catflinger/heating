import { Container } from "inversify";
import "reflect-metadata";
import { IEnvironmentSettings, INJECTABLES } from "../../src/controller/types";
import { EnvironmentSettings } from "../../src/server/environment-settings";

export const container = new Container();

container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettings).inSingletonScope();
container.bind<string>(INJECTABLES.AppRootDir).toConstantValue(__dirname);
