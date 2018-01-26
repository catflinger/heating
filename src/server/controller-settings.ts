import { injectable } from "inversify";
import * as path from "path";
import { IControllerSettings } from "../controller/types";

@injectable()
export class ControllerSettings implements IControllerSettings {

    public get programStoreDir(): string {
        return path.join(__dirname, "data");
    }

    public get boilerPath(): string {
        return "/sys/class/gpio/gpio16/value";
    }

    public get hwPumpPath(): string {
        return "/sys/class/gpio/gpio20/value";
    }

    public get chPumpPath(): string {
        return "/sys/class/gpio/gpio21/value";
    }

    public get slotsPerDay(): number {
        return 6 * 24;
    }

    public get maxOverrideDuration(): number {
        return 10;
    }
}
