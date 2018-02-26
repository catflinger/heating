import { IControllerSettings, INJECTABLES } from "../../src/controller/types";
import * as fs from "fs";
import * as Path from "path";
import { v4 as guid } from "uuid";
import { injectable, inject } from "inversify";
import * as rimraf from "rimraf";

@injectable()
export class Clean {
    constructor(
        @inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
        @inject(INJECTABLES.SlotsPerDay) private slotsPerDay: number) {
    }

    public clean(options: any = {}) {

        // do a sanity check on the config so we don't accidently delete the entire file system
        if (!this.settings.programStoreDir.endsWith("data")) {
            throw new Error("Aborting clean operation - directory must be named data");
        }

        if (!fs.existsSync(this.settings.programStoreDir)) {
            throw new Error("Aborting clean operation - no such directory");
        }

        let configFilePath: string = Path.join(this.settings.programStoreDir, "programs.json");
        let programsDir: string = Path.join(this.settings.programStoreDir, "programs");
        let gpioDir: string = Path.join(this.settings.programStoreDir, "gpio");

        // delete any saved program info
        if (fs.existsSync(configFilePath)) {
            rimraf.sync(configFilePath);
        }

        //delete the programs dir
        if (fs.existsSync(programsDir)) {
            rimraf.sync(programsDir);
        }

        //delete the gpio dir
        if (fs.existsSync(gpioDir)) {
            rimraf.sync(gpioDir);
        }

        // remake the directories 
        fs.mkdirSync(programsDir);
        fs.mkdirSync(gpioDir);

        this.addGPioPin(gpioDir, 16);
        this.addGPioPin(gpioDir, 20);
        this.addGPioPin(gpioDir, 21);

        //data directory is now clean, the rest of the actions are optional

        if (options && options.init) {
            this.addProgrms(this.slotsPerDay, configFilePath, programsDir);
        }
    }

    private addProgrms(slotsPerDay: number, configFilePath: string, programsDir: string) {

        const program: any = {
            "id": guid(),
            "name": "some name",
            "hwmax": 50,
            "hwmin": 40,
            "slots": []
        };

        for (let n: number = 0; n < slotsPerDay; n++) {
            program.slots.push(false);
        }

        // add some default config
        const defaultConfig = {
            activeProgramIds: {
                saturdayId: program.id,
                sundayId: program.id,
                weekdayId: program.id,
            }
        };
        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig), "utf-8");
        fs.writeFileSync(Path.join(programsDir, program.id + ".json"), JSON.stringify(program), "utf-8");
    }

    private addGPioPin(gpioDir: string, pin: number) {
        const dir: string = "gpio" + pin;
        fs.mkdirSync(Path.join(gpioDir, dir));
        fs.writeFileSync(Path.join(gpioDir, dir, "value"), "0", "ascii");

    }
}

