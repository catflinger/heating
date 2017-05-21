import { Container } from "inversify";

import { IControllerSettings, IDigitalOutput, ISwitchable, INJECTABLES } from "../../src/types";
import { Boiler } from "../../src/boiler"; 
import { CHPump } from "../../src/ch-pump"; 
import { HWPump } from "../../src/hw-pump"; 
import { MockControllerSettings } from "./mocks";
import { MockDigitalOutput } from "./mocks";

export const container = new Container();

container.bind<IDigitalOutput>(INJECTABLES.DigitalOutput).to(MockDigitalOutput).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(Boiler).inSingletonScope()
container.bind<ISwitchable>(INJECTABLES.CHPump).to(CHPump).inSingletonScope()
container.bind<ISwitchable>(INJECTABLES.HWPump).to(HWPump).inSingletonScope()
