import * as mocha from 'mocha';
import { container } from "./inversify.config";

var chai = require('chai');
// import * as chai from 'chai';

import { App } from '../../../src/server/app';
import { INJECTABLES, IControllerSettings } from '../../../src/controller/types';

import { IClean, TestingInjectables } from "../../common/injectables-test";
container.get<IClean>(TestingInjectables.Clean).clean({});

let settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
let app = container.get<App>(INJECTABLES.App).start();

chai.use(require("chai-http"));
const expect = chai.expect;

describe("Override API' get /api/override", () => {

    it('should be json', () => {
        return chai.request(app).get('/api/override')
            .then((res: any) => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
            });
    });

    it('should contain array', () => {
        return chai.request(app).get('/api/override')
            .then((res: any) => {
                expect(res.body.items).not.to.be.undefined;
                expect(Array.isArray(res.body.items)).to.be.true;;
                expect(res.body.items.length).to.equal(0);
            });
    });
});

describe("Override API' put /api/override", () => {

    it('response should be json', () => {
        return chai.request(app).put('/api/override')
        .send({
            "status": 1,
            "duration": 4
        })
        .then((res: any) => {
            expect(res.status).to.equal(200);
            expect(res.type).to.eql('application/json');
        });
    });

    it('should now return one override', () => {
        return chai.request(app).get('/api/override')
            .then((res: any) => {
                expect(res.body.items.length).to.equal(1);
            });
    });    
});