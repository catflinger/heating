import { Container } from "inversify";

import { IControllerSettings, IDigitalOutput, ISwitchable, INJECTABLES } from "../../src/controller/types";
import { MockControllerSettings } from "./mock-controller-settings";
import { Boiler } from "../../src/controller/devices/boiler";
import { CHPump } from "../../src/controller/devices/ch-pump";
import { HWPump } from "../../src/controller/devices/hw-pump";
import { TestingInjectables, IClean } from "../common/injectables-test";
import { Clean } from "../common/clean";

export const container = new Container();

// testing modules
container.bind<IClean>(TestingInjectables.Clean).to(Clean).inSingletonScope();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);

// singletons
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(Boiler).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(CHPump).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(HWPump).inSingletonScope();
