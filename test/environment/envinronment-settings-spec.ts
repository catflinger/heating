
import { INJECTABLES, IEnvironmentSettings } from "../../src/controller/types";
import { container } from "./inversify.config.test";

import * as fs from "fs";
import * as Path from "path";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let settings: IEnvironmentSettings = container.get<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings);
let appRootDir: string = container.get<string>(INJECTABLES.AppRootDir);

let settingsFile: string = Path.join(appRootDir, "data", "sensor-config.json");


if (fs.existsSync(settingsFile)) {
    fs.unlinkSync(settingsFile);
}

describe("Environment Settings", () => {

    it("should get sensors without saved config", () => {
        const data = settings.sensorSettings;
        expect(Array.isArray(data.sensors)).to.be.true;
        expect(data.sensors.length).to.equal(1);
        expect(data.sensors[0].id).to.equal("28.0");
        expect(data.sensors[0].role).to.equal("hw");
    });

    it("should load with existing config", () => {

        // add some saved settings
        const mysettings: any =  {
            "sensors": [
                {
                    "id": "28.6767",
                    "description": "saved sensor",
                    "role": "baker"
                },
            ]
        };
        fs.writeFileSync(settingsFile, JSON.stringify(mysettings), "utf-8");
        
        const data = settings.sensorSettings;
        expect(Array.isArray(data.sensors)).to.be.true;
        expect(data.sensors.length).to.equal(1);
        expect(data.sensors[0].id).to.equal("28.6767");
        expect(data.sensors[0].role).to.equal("baker");
    });
});