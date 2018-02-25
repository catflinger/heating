import { injectable } from "inversify";
import * as path from "path";
import {IControllerSettings, INJECTABLES } from "../../../src/controller/types";

@injectable()
export class ControllerSettings implements IControllerSettings {

    public startPolling: boolean = true;

    public programStoreDir: string = path.join(__dirname, "data");

    public debugDir: string = path.join(__dirname, "data", "debug");

    public boilerPath: string = path.join(__dirname, "data", "gpio", "gpio16", "value");
    public chPumpPath: string = path.join(__dirname, "data", "gpio", "gpio20", "value");
    public hwPumpPath: string = path.join(__dirname, "data", "gpio", "gpio21", "value");

    public get maxOverrideDuration(): number {
        return 10;
    }
}
