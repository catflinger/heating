import { Controller } from "../../src/controller/controller";

import * as chai from "chai";

const expect = chai.expect;

describe("controller", () => {

  it("should construct", () => {
    const controller = new Controller();
  });

  it("should return summary info", () => {
      const controller = new Controller();
      const summary = controller.getSummary();

      expect(summary).to.be.not.null;
  });
});