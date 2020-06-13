"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __importDefault(require("../Logger"));
Logger_1.default.Log("catchAllErrorHandler started and allocated to memory.");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function catchAllErrorHandler(error, req, res, _next) {
    Logger_1.default.Log("Hit the last Error Handler");
    res.status(error.statusCode).json({ error: error });
    return;
}
exports.default = catchAllErrorHandler;
