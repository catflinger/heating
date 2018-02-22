import { Container, interfaces } from "inversify";
import "reflect-metadata";
import { IControlStrategy, IController, IControllerSettings, IEnvironment, IOverride, IProgram, ISwitchable, INJECTABLES, IControllable, IProgramManager } from "../../src/controller/types";

import { MockControlStrategy, MockDevice,MockEnvironment } from "./mocks";
import { MockClock } from "../common/mock-clock";
import { Program } from "../../src/controller/program";
import { Override } from "../../src/controller/override";
import { System } from "../../src/controller/system";
import { MockControllerSettings } from "../common/mock-controller-settings";
import { ProgramManager } from "../../src/controller/program-manager";
import { Switchable } from "../../src/controller/switchable";
import { Controller } from "../../src/controller/controller";

export const container = new Container();

container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<IOverride>(INJECTABLES.Override).to(Override).inSingletonScope();
container.bind<MockControlStrategy>(INJECTABLES.ControlStrategy).to(MockControlStrategy).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IEnvironment>(INJECTABLES.Environment).to(MockEnvironment).inSingletonScope();
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.Boiler).to(MockDevice).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.HWPump).to(MockDevice).inSingletonScope();
container.bind<ISwitchable>(INJECTABLES.CHPump).to(MockDevice).inSingletonScope();
container.bind<MockClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();
container.bind<IControllable>(INJECTABLES.System).to(System);
container.bind<IController>(INJECTABLES.Controller).to(Controller).inSingletonScope();

container.bind<IProgram>(INJECTABLES.Program).to(Program);

// bind INJECTABLES.ProgramFactory to a function that creates program objects
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
    .toFactory<IProgram>((context: interfaces.Context) => {
        return () => {
            return context.container.get<IProgram>(INJECTABLES.Program);
        };
    });
