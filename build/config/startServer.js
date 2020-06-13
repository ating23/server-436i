"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __importDefault(require("../errors/Logger"));
var PORT = process.env.PORT || 5000;
Logger_1.default.Log("startServer started and allocated to memory.");
function startServer() {
    Logger_1.default.Log("Listening on PORT " + PORT + ". Server is running in: " + process.env.NODE_ENV);
}
exports.default = startServer;
