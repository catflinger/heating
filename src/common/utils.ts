import * as Debug from "debug";
import * as Fs from "fs";
import { inject, injectable } from "inversify";
import * as Path from "path";
import { IControllerSettings, INJECTABLES } from "../controller/types";

const dump = Debug("dump");

@injectable()
export class Utils {
    @inject(INJECTABLES.ControllerSettings)
    private settings: IControllerSettings;

    public dumpTextFile(name: string, data: string): void {
        if (dump.enabled) {
            // is it worth reporting any errors here? If so how and where to?
            Fs.writeFile(
                Path.join(this.settings.debugDir, name),
                JSON.stringify(data));
        }
    }
}
