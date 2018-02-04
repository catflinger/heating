"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var Debug = require("debug");
var express = require("express");
var types_1 = require("../controller/types");
var inversify_config_dev_1 = require("../inversify.config.dev");
var debug = Debug("app");
var App = (function () {
    function App() {
        this.controller = inversify_config_dev_1.container.get(types_1.INJECTABLES.Controller);
        this.controlApi = inversify_config_dev_1.container.get(types_1.INJECTABLES.ControlApi);
        this.programApi = inversify_config_dev_1.container.get(types_1.INJECTABLES.ProgramApi);
        this.statusApi = inversify_config_dev_1.container.get(types_1.INJECTABLES.StatusApi);
    }
    App.prototype.start = function () {
        this.express = express();
        var router = express.Router();
        this.statusApi.addRoutes(router);
        this.controlApi.addRoutes(router);
        this.programApi.addRoutes(router);
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
    return App;
}());
exports.default = new App().start();
