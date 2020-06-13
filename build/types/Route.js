"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = /** @class */ (function () {
    function Route(method, base, relative) {
        this.method = method;
        this.url = "" + base + relative;
        this.relative = relative;
    }
    return Route;
}());
exports.default = Route;
