import { Container } from "inversify";
import "reflect-metadata";
import { Override } from "../../src/controller/override";
import { IControllerSettings, INJECTABLES, IOverride } from "../../src/controller/types";

import { MockClock } from "../common/mock-clock";
import { MockControllerSettings } from "../common/mock-controller-settings";

export const container = new Container();

container.bind<IOverride>(INJECTABLES.Override).to(Override).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<MockClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();