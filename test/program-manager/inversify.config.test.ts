import { Container, interfaces } from "inversify";

import { IControllerSettings, IProgram, INJECTABLES, IProgramManager } from "../../src/controller/types";
import { Program } from "../../src/controller/program"; 
import { MockControllerSettings } from "../common/mock-controller-settings";
import { ProgramManager } from "../../src/controller/program-manager";

export const container = new Container();

// constants
container.bind<number>(INJECTABLES.SlotsPerDay).toConstantValue(10);

// singletons
container.bind<IProgramManager>(INJECTABLES.ProgramManager).to(ProgramManager).inSingletonScope();
container.bind<IControllerSettings>(INJECTABLES.ControllerSettings).to(MockControllerSettings).inSingletonScope();

// discrete instances
container.bind<IProgram>(INJECTABLES.Program).to(Program);

// bind INJECTABLES.ProgramFactory to a function that creates program objects
container.bind<interfaces.Factory<IProgram>>(INJECTABLES.ProgramFactory)
        .toFactory<IProgram>((context: interfaces.Context) => {
            return () => {
                return context.container.get<IProgram>(INJECTABLES.Program);
            };
        });
