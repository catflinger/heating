import { injectable } from "inversify";
import { IControllerSettings } from "../controller/types";

@injectable()
export class ControllerSettings implements IControllerSettings {

    public get programStore(): string {
        return __dirname + "/data/";
    }

    public get slotsPerDay(): number {
        return 6 * 24;
    }

    public get boilerPin(): number {
        return 16;
    }

    public get hwPumpPin(): number {
        return 20;
    }

    public get chPumpPin(): number {
        return 21;
    }

    public get maxOverrideDuration(): number {
        return 10;
    }
}
