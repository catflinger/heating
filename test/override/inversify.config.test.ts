import { Container } from "inversify";
import "reflect-metadata";
import { OverrideManager } from "../../src/controller/override-manager";
import { INJECTABLES, IOverrideManager } from "../../src/controller/types";

import { MockClock } from "../common/mock-clock";
//import { MockControllerSettings } from "../common/mock-controller-settings";

export const container = new Container();

container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<IOverrideManager>(INJECTABLES.OverrideManager).to(OverrideManager).inSingletonScope();
//container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<MockClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();