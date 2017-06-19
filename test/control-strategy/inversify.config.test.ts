import { Container } from "inversify";
import "reflect-metadata";
import { IClock, IControlStrategy, IControllerSettings, IProgram, INJECTABLES } from "../../src/controller/types";
import { Program } from "../../src/controller/program";
import { MockControllerSettings } from "../common/mock-controller-settings";
import { MockClock } from "../common/mock-clock";
import { BasicControlStrategy } from "../../src/controller/basic-control-strategy";

export const container = new Container();

container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IProgram>(INJECTABLES.Program).to(Program).inSingletonScope();
container.bind<MockClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();
container.bind<IControlStrategy>(INJECTABLES.ControlStrategy).to(BasicControlStrategy).inSingletonScope();

