import { Container } from "inversify";

import { IControllerSettings, IDigitalOutput, ISwitchable, INJECTABLES } from "../../src/controller/types";
import { Boiler } from "../../src/controller/boiler"; 
import { CHPump } from "../../src/controller/ch-pump"; 
import { HWPump } from "../../src/controller/hw-pump"; 
import { MockControllerSettings } from "./mocks";
import { MockDigitalOutput } from "./mocks";

export const container = new Container();

container.bind<IDigitalOutput>(INJECTABLES.DigitalOutput).to(MockDigitalOutput).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(Boiler).inSingletonScope()
container.bind<ISwitchable>(INJECTABLES.CHPump).to(CHPump).inSingletonScope()
container.bind<ISwitchable>(INJECTABLES.HWPump).to(HWPump).inSingletonScope()
