import { Container } from "inversify";
import "reflect-metadata";

import { ControllerSettings } from "./controller-settings";
import { EnvironmentSettings } from "./environment-settings";

import {
    // the injectable interfaces
    IClock,
    IControllable,
    IController,
    IControllerSettings,
    IControlStrategy,
    IDigitalOutput,
    IEnvironment,
    IEnvironmentSettings,
    INJECTABLES,
    IOverride,
    IProgram,
    ISwitchable,
} from "../controller/types";

import { MockDigitalOutput } from "../../test/switchables/mocks";
import { BasicControlStrategy } from "../controller/basic-control-strategy";
import { Boiler } from "../controller/boiler";
import { CHPump } from "../controller/ch-pump";
import { Clock } from "../controller/clock";
import { Environment } from "../controller/environment";
import { HWPump } from "../controller/hw-pump";
import { Override } from "../controller/override";
import { Program } from "../controller/program";
import { System } from "../controller/system";

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
container.bind<IOverride>(INJECTABLES.Override).to(Override).inSingletonScope();
