import * as mocha from 'mocha';
import { container } from "./inversify.config.test";
import { readFileSync } from "fs";

var chai = require('chai');
// import * as chai from 'chai';

import { App } from '../../../src/server/app';
import { INJECTABLES, ILogger } from '../../../src/controller/types';

let app = container.get<App>(INJECTABLES.App).start();

chai.use(require("chai-http"));
const expect = chai.expect;

describe("Onewire API get /api/onewire", () => {

    it('should be json and contain records', () => {
        return chai.request(app).get('/api/onewire')
            .then((res: any) => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
                const devices: any = res.body.devices;
                expect(Array.isArray(devices)).to.be.true;
                expect(devices.length).to.equal(3);
                expect(devices[0]).to.equal("28.0");
                expect(devices[1]).to.equal("28.1");
                expect(devices[2]).to.equal("28.2");
            });
    });
});
