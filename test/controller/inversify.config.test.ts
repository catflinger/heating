import { Container } from "inversify";
import "reflect-metadata";
import { IControlStrategy, IController, IControllerSettings, IEnvironment, IOverride, IProgram, ISwitchable, INJECTABLES, IControllable } from "../../src/controller/types";

import { MockControlStrategy, MockDevice, MockControllerSettings, MockEnvironment } from "./mocks";
import { MockClock } from "../common/mock-clock";
import { Program } from "../../src/controller/program";
import { Override } from "../../src/controller/override";
import { System } from "../../src/controller/system";

export const container = new Container();

container.bind<IOverride>(INJECTABLES.Override).to(Override).inSingletonScope();
container.bind<MockControlStrategy>(INJECTABLES.ControlStrategy).to(MockControlStrategy).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(MockEnvironment).inSingletonScope();
container.bind<IProgram>(INJECTABLES.Program).to(Program).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(MockDevice).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(MockDevice).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(MockDevice).inSingletonScope();
container.bind<MockClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System);