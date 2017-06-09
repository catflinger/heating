import { Container } from "inversify";
import "reflect-metadata";

import { ControllerSettings } from "./controller-settings";
import { EnvironmentSettings } from "./environment-settings";

import {
    // the injectable interfaces
    IClock,
    IController,
    IControllerSettings,
    IControlStrategy,
    IDigitalOutput,
    IEnvironment,
    IEnvironmentSettings,
    INJECTABLES,
    IProgram,
    ISwitchable,
} from "../controller/index";

import {
    // the concrete class for this implementation
    BasicControlStrategy,
    Boiler,
    CHPump,
    Clock,
    Controller,
    Environment,
    HWPump,
    Program,
} from "../controller/index";

import { MockDigitalOutput } from "../../test/switchables/mocks";
import { System } from "../controller/system";
import { IControllable } from "../controller/types";

export const container = new Container();

container.bind<IControlStrategy>(INJECTABLES.ControlStrategy).to(BasicControlStrategy).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(ControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(Environment).inSingletonScope();
container.bind<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings).to(EnvironmentSettings).inSingletonScope();
container.bind<IProgram>(INJECTABLES.Program).to(Program).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(Boiler).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(HWPump).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(CHPump).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(Clock).inSingletonScope();
container.bind<IDigitalOutput>(INJECTABLES.DigitalOutput).to(MockDigitalOutput).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System);
