import * as mocha from 'mocha';
var chai = require('chai');
// import * as chai from 'chai';

import { container } from "./inversify.config";
import { App } from '../../../src/server/app';
import { INJECTABLES, IControllerSettings } from '../../../src/controller/types';
import { clean } from '../../common/clean';

chai.use(require("chai-http"));
const expect = chai.expect;

let settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
clean(settings);

const app = container.get<App>(INJECTABLES.App).start();

describe('Pogram API', () => {

  it('should be json', () => {
    return chai.request(app).get('/api/program')
    .then((res: any) => {
      expect(res.type).to.eql('application/json');
    });
  });

  it('should contain config data', () => {
    return chai.request(app).get('/api/program')
    .then((res: any) => {
        expect(res.status).to.equal(200);
        expect(res.body.config).not.to.be.undefined;
        expect(res.body.config.saturday).not.to.be.undefined;
        expect(res.body.config.saturday.length).to.equal(36);
    });
  });

  it('should contain program data', () => {
    return chai.request(app).get('/api/program')
    .then((res: any) => {
        expect(res.status).to.equal(200);

        expect(res.body.programs).not.to.be.undefined;
        expect(Array.isArray(res.body.programs)).to.be.true;
        expect(res.body.programs.length).to.equal(1);
    });
  });


});
