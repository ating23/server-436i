"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.Error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (process.env.NODE_ENV === "development") {
            console.error.apply(console, args);
        }
    };
    Logger.Log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (process.env.NODE_ENV === "development") {
            console.log.apply(console, args);
        }
    };
    return Logger;
}());
exports.default = Logger;
