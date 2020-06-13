"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __importDefault(require("./Logger"));
/**
 * If you pass an error to next() and you do not handle it in
 *  a custom error handler, it will be handled by the built-in
 *  error handler the error will be written to the client with
 *  the stack trace.
 *
 * The stack trace is not included in the @production environment.
 *
 */
function LogErrorHandler(err, _req, _res, next) {
    Logger_1.default.Log("==========================");
    Logger_1.default.Log("Express App Error Logger Start: ");
    Logger_1.default.Error("Custom Error Name: ", err.errorName);
    Logger_1.default.Error("Status Code: ", err.statusCode);
    Logger_1.default.Error("Client Message: ", err.errorClientMessage);
    Logger_1.default.Error("Timestamp: ", err.errorTimestamp);
    Logger_1.default.Log();
    Logger_1.default.Log("Default Error Details: ");
    Logger_1.default.Log();
    Logger_1.default.Error("Default Error Name: ", err.name);
    Logger_1.default.Log();
    Logger_1.default.Log("Express App Error Logger End: ");
    Logger_1.default.Log("==========================");
    next(err);
}
exports.default = LogErrorHandler;
