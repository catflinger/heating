"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var Debug = require("debug");
var express = require("express");
var inversify_1 = require("inversify");
var types_1 = require("../controller/types");
var debug = Debug("app");
var App = (function () {
    function App(controller, configApi, statusApi, programApi, overrideApi) {
        this.controller = controller;
        this.configApi = configApi;
        this.statusApi = statusApi;
        this.programApi = programApi;
        this.overrideApi = overrideApi;
    }
    App.prototype.start = function () {
        this.express = express();
        var router = express.Router();
        this.statusApi.addRoutes(router);
        this.configApi.addRoutes(router);
        this.programApi.addRoutes(router);
        this.overrideApi.addRoutes(router);
        this.controller.start();
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.express.use(bodyParser.json({
            limit: 100,
        }));
        this.express.use("/api/", router);
        var wwwroot = __dirname + "/../../../wwwroot";
        this.express.use(express.static(wwwroot));
        debug("Serving static content from " + wwwroot);
        return this.express;
    };
    App = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.INJECTABLES.Controller)),
        __param(1, inversify_1.inject(types_1.INJECTABLES.ProgramConfigApi)),
        __param(2, inversify_1.inject(types_1.INJECTABLES.StatusApi)),
        __param(3, inversify_1.inject(types_1.INJECTABLES.ProgramApi)),
        __param(4, inversify_1.inject(types_1.INJECTABLES.OverrideApi)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], App);
    return App;
}());
exports.App = App;
