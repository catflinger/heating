import { injectable } from "inversify";
import { IControllerSettings } from "../controller/index";

@injectable()
export class ControllerSettings implements IControllerSettings {

    public get slotsPerDay(): number {
        return 10;
    }

    public get boilerPin(): number {
        return 21;
    }

    public get hwPumpPin(): number {
        return 22;
    }

    public get chPumpPin(): number {
        return 23;
    }
}
