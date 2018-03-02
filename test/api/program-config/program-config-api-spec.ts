import * as mocha from 'mocha';
var chai = require('chai');
// import * as chai from 'chai';
import { container } from "./inversify.config";
import * as fs from "fs"; 

import { App } from '../../../src/server/app';
import { INJECTABLES, IControllerSettings } from '../../../src/controller/types';
import { IClean, TestingInjectables } from "../../common/injectables-test";

container.get<IClean>(TestingInjectables.Clean).clean({});

let settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
let app = container.get<App>(INJECTABLES.App).start();

chai.use(require("chai-http"));
const expect = chai.expect;

describe('program-config api GET', () => {

    it('should be json', () => {
        return chai.request(app).get('/api/program-config')
            .then((res: any) => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
            });
    });

    it('should return program config', () => {
        return chai.request(app).get('/api/program-config')
            .then((res: any) => {
                let config = res.body;
                expect(config).not.to.be.undefined;
                expect(config.saturdayProgramId).not.to.be.undefined;
                expect(config.sundayProgramId).not.to.be.undefined;
                expect(config.weekdayProgramId).not.to.be.undefined;
            });
    });
});

describe('program-config api PUT', () => {

    //find a suitable program to test happy path

    it('should be reject bad data', () => {
        return chai.request(app).put('/api/program-config')
        .send({
            saturdayProgramId: "abcde",
            sundayProgramId: "abcde",
            weekdayProgramId: "abcde",
        })
        .then((res: any) => {
            throw new Error("should not accept this data");
        })
        .catch((error: any) => {
            expect(error.status).to.equal(401);
        });
    });
});
