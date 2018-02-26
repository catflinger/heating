import { Container, interfaces } from "inversify";
import "reflect-metadata";
import { IControllerSettings, IProgram, INJECTABLES, IClock, IProgramStore } from "../../src/controller/types";
import { Program } from "../../src/controller/program"; 
import { MockControllerSettings } from "./mock-controller-settings";
import { MockClock } from "../common/mock-clock";
import { ProgramStore } from "../../src/controller/program-store";
import { TestingInjectables, IClean } from "../common/injectables-test";
import { Clean } from "../common/clean";

export const container = new Container();

// testing modules
container.bind<IClean>(TestingInjectables.Clean).to(Clean).inSingletonScope();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);

// singletons
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();
container.bind<IClock>(INJECTABLES.Clock).to(MockClock).inSingletonScope();

// discrete instances
container.bind<IProgramStore>(INJECTABLES.ProgramStore).to(ProgramStore);
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// bind INJECTABLES.ProgramFactory to a function that creates program objects
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
        .toFactory<IProgram>((context: interfaces.Context) => {
            return () => {
                return context.container.get<IProgram>(INJECTABLES.Program);
            };
        });
