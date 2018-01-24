import { Container } from "inversify";

import { IControllerSettings, IDigitalOutput, ISwitchable, INJECTABLES } from "../../src/controller/types";
import { MockDigitalOutput } from "./mocks";
import { MockControllerSettings } from "../common/mock-controller-settings";

export const container = new Container();

container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<IDigitalOutput>(INJECTABLES.DigitalOutput).to(MockDigitalOutput).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
