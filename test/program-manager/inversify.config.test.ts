import { Container, interfaces } from "inversify";
import * as path from "path";
import "reflect-metadata";
import { IControllerSettings, IProgram, INJECTABLES, IProgramManager, IClock, IProgramStore } from "../../src/controller/types";
import { Program } from "../../src/controller/program"; 
import { MockControllerSettings } from "./mock-controller-settings";
import { ProgramManager } from "../../src/controller/program-manager";
import { MockClock } from "../common/mock-clock";
import { ProgramStore } from "../../src/controller/program-store";
import { TestingInjectables, IClean } from "../common/injectables-test";
import { Clean } from "../common/clean";

export const container = new Container();

// testing modules
container.bind<IClean>(TestingInjectables.Clean).to(Clean).inSingletonScope();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);
container.bind<string>(INJECTABLES.AppRootDir).toConstantValue(path.join(__dirname, "data"));
container.bind<string>(INJECTABLES.GpioRootDir).toConstantValue(path.join(__dirname, "data", "gpio"));
// singletons
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();

// discrete instances
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager); //note: this would normally be a singleton
container.bind<IProgramStore>(INJECTABLES.ProgramStore).to(ProgramStore);
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// bind INJECTABLES.ProgramFactory to a function that creates program objects
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
        .toFactory<IProgram>((context: interfaces.Context) => {
            return () => {
                return context.container.get<IProgram>(INJECTABLES.Program);
            };
        });
