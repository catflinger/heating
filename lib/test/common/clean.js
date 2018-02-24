"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Path = require("path");
function clean(settings) {
    var latestFilePath = Path.join(settings.programStoreDir, "programs.json");
    var programsDir = Path.join(settings.programStoreDir, "programs");
    if (fs.existsSync(latestFilePath)) {
        fs.unlinkSync(latestFilePath);
    }
    var files = fs.readdirSync(programsDir);
    files.forEach(function (f) {
        if (f.endsWith(".json")) {
            fs.unlinkSync(Path.join(programsDir, f));
        }
    });
}
exports.clean = clean;
