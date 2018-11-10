
import { INJECTABLES, IEnvironmentSettings, SensorSetting } from "../../src/controller/types";
import { container } from "./inversify.config.test";
import { Sensor } from "../../src/controller/sensor";

import * as fs from "fs";
import * as Path from "path";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let settings: IEnvironmentSettings = container.get<IEnvironmentSettings>(INJECTABLES.EnvironmentSettings);
let appRootDir: string = container.get<string>(INJECTABLES.AppRootDir);

let settingsFile: string = Path.join(appRootDir, "settings", "sensor-config.json");


if (fs.existsSync(settingsFile)) {
    fs.unlinkSync(settingsFile);
}

describe("Environment Settings", () => {

    it("should get sensors without saved config", () => {
        const data: SensorSetting[] = settings.getSensorSettings();
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(0);
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
                {
                    "id": "28.3333",
                    "description": "unused",
                    "role": "sailor",
                    "deleted": true,
                },
            ]
        };
        fs.writeFileSync(settingsFile, JSON.stringify(mysettings), "utf-8");
        
        let data: SensorSetting[] = settings.getSensorSettings();
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(1);
        expect(data[0].id).to.equal("28.6767");
        expect(data[0].role).to.equal("baker");

        data = settings.getSensorSettings(true);
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(2);
        expect(data[0].id).to.equal("28.6767");
        expect(data[0].role).to.equal("baker");
        expect(data[1].id).to.equal("28.3333");
        expect(data[1].role).to.equal("sailor");
        expect(data[1].deleted).to.be.true;
    });

    it("should remove a setting", () => {

        // add some saved settings
        const mysettings: any =  {
            "sensors": [
                {
                    "id": "28.6767",
                    "description": "saved sensor",
                    "role": "tinker"
                },
                {
                    "id": "28.1111",
                    "description": "saved sensor",
                    "role": "tailor"
                },
                {
                    "id": "28.2222",
                    "description": "saved sensor",
                    "role": "soldier"
                },
            ]
        };
        fs.writeFileSync(settingsFile, JSON.stringify(mysettings), "utf-8");
        
        let data: SensorSetting[] = settings.getSensorSettings();
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(3);
    
        // remove an existing setting
        settings.removeSensorSetting("28.1111");
        // remove an non-existent setting (should have no effect)
        settings.removeSensorSetting("0000");

        data = settings.getSensorSettings();
        
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(2);
        expect(data[0].id).to.equal("28.6767");
        expect(data[0].role).to.equal("tinker");
        expect(data[1].id).to.equal("28.2222");
        expect(data[1].role).to.equal("soldier");
    });
    
    it("should update a setting", () => {

        // add some saved settings
        const mysettings: any =  {
            "sensors": [
                {
                    "id": "28.6767",
                    "description": "saved sensor",
                    "role": "tinker"
                },
                {
                    "id": "28.1111",
                    "description": "saved sensor",
                    "role": "tailor"
                },
                {
                    "id": "28.2222",
                    "description": "saved sensor",
                    "role": "soldier"
                },
            ]
        };
        fs.writeFileSync(settingsFile, JSON.stringify(mysettings), "utf-8");
        
        let data: SensorSetting[] = settings.getSensorSettings();
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(3);
    
        // update an existing setting
        settings.updateSensorSetting(new SensorSetting("28.1111", "changed", "altered"));

        // add a new setting
        settings.updateSensorSetting(new SensorSetting("28.9999", "new desc", "new role"));

        data = settings.getSensorSettings();
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(4);

        expect(data[0].id).to.equal("28.6767");
        expect(data[0].role).to.equal("tinker");
        
        expect(data[1].id).to.equal("28.1111");
        expect(data[1].description).to.equal("changed");
        expect(data[1].role).to.equal("altered");

        expect(data[3].id).to.equal("28.9999");
        expect(data[3].description).to.equal("new desc");
        expect(data[3].role).to.equal("new role");

    });
});