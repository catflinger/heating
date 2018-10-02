import * as mocha from 'mocha';
import { container } from "./inversify.config.test";
import { readFileSync } from "fs";

var chai = require('chai');
// import * as chai from 'chai';

import { App } from '../../../src/server/app';
import { INJECTABLES, ILogger } from '../../../src/controller/types';

let app = container.get<App>(INJECTABLES.App).start();
let logger = container.get<ILogger>(INJECTABLES.Logger);
let filepath = logger.getLogfileName();

chai.use(require("chai-http"));
const expect = chai.expect;

describe("Logger API get /api/log", () => {

    it('should be text/csv', () => {
        return chai.request(app).get('/api/log/current.csv')
            .then((res: any) => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('text/csv');
            });
    });

    it('should contain records', () => {
        return chai.request(app).get('/api/log/current.csv')
            .then((res: any) => {
                let data = readFileSync(filepath, "utf-8");
                expect(res.text).to.equal(data);
            });
    });
});
describe("Logger API get /api/log-list", () => {

    it('should be json', () => {
        return chai.request(app).get('/api/log')
            .then((res: any) => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
            });
    });

});
