import { IControllerSettings } from "../../src/controller/types";
import * as fs from "fs";
import * as Path from "path";

export function clean(settings: IControllerSettings) {
    let latestFilePath: string = Path.join(settings.programStoreDir, "programs.json");
    let programsDir: string = Path.join(settings.programStoreDir, "programs");

    // delete any saved program info
    if (fs.existsSync(latestFilePath)) {
        fs.unlinkSync(latestFilePath);
    }

    // delete any program files
    let files: string[] = fs.readdirSync(programsDir);
    files.forEach((f) => {
        if (f.endsWith(".json")) {
            fs.unlinkSync(Path.join(programsDir, f));
        }
    });
}


