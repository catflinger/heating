"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var types_1 = require("../../src/controller/types");
var environment_1 = require("../../src/controller/environment");
var mocks_1 = require("./mocks");
exports.container = new inversify_1.Container();
exports.container.bind(types_1.INJECTABLES.EnvironmentSettings).to(mocks_1.MockEnvironmentSettings).inSingletonScope();
exports.container.bind(types_1.INJECTABLES.Environment).to(environment_1.Environment).inSingletonScope();
