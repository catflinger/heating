import { Container, interfaces } from "inversify";
import "reflect-metadata";
import { INJECTABLES } from "../../src/controller/types";

import { MockClock } from "../common/mock-clock";

export const container = new Container();

container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<MockClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();
