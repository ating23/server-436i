"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = process.env, NODE_ENV = _a.NODE_ENV, SERVER_PORT = _a.SERVER_PORT;
var API_URL = "https://api.educonnections.ca";
var DEV_URL = "http://localhost:" + SERVER_PORT;
function generateURI(extension) {
    var URL = NODE_ENV === "development" ? DEV_URL : API_URL;
    return URL + extension;
}
exports.default = generateURI;
