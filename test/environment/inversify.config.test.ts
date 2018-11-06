import { Container } from "inversify";
import * as path from "path";
import "reflect-metadata";
import { IEnvironmentSettings, INJECTABLES } from "../../src/controller/types";
import { EnvironmentSettings } from "../../src/controller/environment-settings";

export const container = new Container();

container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettings).inSingletonScope();
container.bind<string>(INJECTABLES.AppRootDir).toConstantValue(path.join(__dirname, "data"));
