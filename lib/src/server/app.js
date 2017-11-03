"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var Debug = require("debug");
var express = require("express");
var inversify_config_1 = require("./inversify.config");
var controller_1 = require("../controller/controller");
var control_api_1 = require("./api/control-api");
var program_api_1 = require("./api/program-api");
var status_api_1 = require("./api/status-api");
var debug = Debug("app");
var App = (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.express = express();
        var router = express.Router();
        var controller = new controller_1.Controller(inversify_config_1.container);
        status_api_1.StatusApi.addRoutes(router, controller);
        control_api_1.ControlApi.addRoutes(router, controller);
        program_api_1.ProgramApi.addRoutes(router, controller);
        controller.start();
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
