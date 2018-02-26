import * as mocha from 'mocha';
var chai = require('chai');
// import * as chai from 'chai';
import { container } from "./inversify.config";

import { App } from '../../../src/server/app';
import { INJECTABLES, IControllerSettings } from '../../../src/controller/types';
import { IClean, TestingInjectables } from "../../common/injectables-test";

container.get<IClean>(TestingInjectables.Clean).clean({});

let settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
let app = container.get<App>(INJECTABLES.App).start();

chai.use(require("chai-http"));
const expect = chai.expect;

describe("Status API' get /api/status", () => {

    it('should be json', () => {
        return chai.request(app).get('/api/status')
            .then((res: any) => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
            });
    });

    it('should contain data', () => {
        return chai.request(app).get('/api/status')
            .then((res: any) => {
                expect(res.body.items).not.to.be.undefined;
                expect(Array.isArray(res.body.items)).to.be.true;;
                expect(res.body.items.length).to.equal(5);
            });
    });

    it('items are in the correct order', () => {
        return chai.request(app).get('/api/status')
            .then((res: any) => {
                expect(res.body.items).not.to.be.undefined;
                expect(Array.isArray(res.body.items)).to.be.true;;
                expect(res.body.items.length).to.equal(5);
                
                expect(res.body.items[0].id).to.equal("control");
                expect(res.body.items[1].id).to.equal("device");
                expect(res.body.items[2].id).to.equal("env");
                expect(res.body.items[3].id).to.equal("override");
                expect(res.body.items[4].id).to.equal("program");
            });
    });
});

describe("Status API' post /api/status", () => {

    it('should reject request', () => {
        return chai.request(app).post('/api/status')
            .then((res: any) => {
                throw new Error("should error");
            })
            .catch((res: any) => {
                expect(res.status).to.equal(404);            
            });
    });
});

describe("Status API' put /api/status", () => {

    it('should reject request', () => {
        return chai.request(app).put('/api/status')
            .then((res: any) => {
                throw new Error("should error");
            })
            .catch((res: any) => {
                expect(res.status).to.equal(404);            
            });
    });
});

describe("Status API' delete /api/status", () => {

    it('should reject request', () => {
        return chai.request(app).delete('/api/status')
            .then((res: any) => {
                throw new Error("should error");
            })
            .catch((res: any) => {
                expect(res.status).to.equal(404);            
            });
    });
});