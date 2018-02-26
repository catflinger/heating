import { IControllerSettings } from "../../src/controller/types";
import * as fs from "fs";
import * as Path from "path";
import { v4 as guid } from "uuid";

export function clean(settings: IControllerSettings, slotsPerDay: number, options: any) {

    // do a sanity check on the config so we don't accidently delete the entire file system
    if (!settings.programStoreDir.endsWith("data")) {
        throw new Error("Aborting clean operation");
    }

    let configFilePath: string = Path.join(settings.programStoreDir, "programs.json");
    let programsDir: string = Path.join(settings.programStoreDir, "programs");
    let gpioDir: string = Path.join(settings.programStoreDir, "gpio");

    // delete any saved program info
    if (fs.existsSync(configFilePath)) {
        fs.unlinkSync(configFilePath);
    }

    //delete the programs dir
    if (!fs.existsSync(programsDir)) {
        fs.rmdirSync(programsDir);
    }

    //delete the gpio dir
    if (!fs.existsSync(gpioDir)) {
        fs.rmdirSync(gpioDir);
    }

    // remake the directories 
    fs.mkdirSync(programsDir);
    fs.mkdirSync(gpioDir);

    addGPioPin(gpioDir, 16);
    addGPioPin(gpioDir, 20);
    addGPioPin(gpioDir, 21);

    //data directory is now clean, the rest of the actions are optional

    if (options && options.initPrograms) {
        addProgrms(slotsPerDay, configFilePath, programsDir);
    }
}

function addProgrms(slotsPerDay: number, configFilePath: string, programsDir: string) {

    const program: any = {
        "id": guid(),
        "name":"some name",
        "hwmax":50,
        "hwmin":40,
        "slots":[]
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

function addGPioPin(gpioDir: string, pin: number) {
    const dir: string = "gpio" + pin;
    fs.mkdirSync(Path.join(gpioDir, dir));
    fs.writeFileSync(Path.join(gpioDir, dir, "value"), "1", "ascii");

}

