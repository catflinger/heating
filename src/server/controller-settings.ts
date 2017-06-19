import { injectable } from "inversify";
import { IControllerSettings } from "../controller/index";

@injectable()
export class ControllerSettings implements IControllerSettings {
    public get programFile(): string {
        return __dirname + "/data/program.json";
    }

    public get slotsPerDay(): number {
        return 6 * 24;
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

    public get maxOverrideDuration(): number {
        return 10;
    }
}
