import { Container, interfaces } from "inversify";
import * as path from "path";
import "reflect-metadata";
import { IController, IControllerSettings, IEnvironment, IOverrideManager, IProgram, ISwitchable, INJECTABLES, IControllable, IProgramManager, IProgramStore } from "../../src/controller/types";

import { MockControlStrategy, MockEnvironment, MockBoiler, MockHWPump, MockCHPump } from "./mocks";
import { MockClock } from "../common/mock-clock";
import { Program } from "../../src/controller/program";
import { OverrideManager } from "../../src/controller/override-manager";
import { System } from "../../src/controller/system";
import { MockControllerSettings } from "./mock-controller-settings";
import { ProgramManager } from "../../src/controller/program-manager";
import { Controller } from "../../src/controller/controller";
import { ProgramStore } from "../../src/controller/program-store";
import { TestingInjectables, IClean } from "../common/injectables-test";
import { Clean } from "../common/clean";

export const container = new Container();

// testing modules
container.bind<IClean>(TestingInjectables.Clean).to(Clean).inSingletonScope();

container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<string>(INJECTABLES.AppRootDir).toConstantValue(path.join(__dirname, "data"));
container.bind<string>(INJECTABLES.GpioRootDir).toConstantValue(path.join(__dirname, "data", "gpio"));
container.bind<string>(INJECTABLES.OneWireDir).toConstantValue(path.join(__dirname, "data", "1wire"));

container.bind<IOverrideManager>(INJECTABLES.OverrideManager).to(OverrideManager).inSingletonScope();
container.bind<MockControlStrategy>(INJECTABLES.ControlStrategy).to(MockControlStrategy).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(MockEnvironment).inSingletonScope();
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(MockBoiler).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(MockHWPump).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(MockCHPump).inSingletonScope();
container.bind<MockClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System);
container.bind<IController>(INJECTABLES.Controller).to(Controller).inSingletonScope();
container.bind<IProgramStore>(INJECTABLES.ProgramStore).to(ProgramStore);
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// bind INJECTABLES.ProgramFactory to a function that creates program objects
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
    .toFactory<IProgram>((context: interfaces.Context) => {
        return () => {
            return context.container.get<IProgram>(INJECTABLES.Program);
        };
    });
