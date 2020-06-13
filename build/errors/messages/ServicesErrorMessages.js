"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtFailedError = exports.MongoUnavaiableError = exports.NoAccountFoundError = void 0;
var ErrorHandler_1 = __importDefault(require("../ErrorHandler"));
var statusCodes_1 = __importDefault(require("../../api/statusCodes"));
exports.NoAccountFoundError = new ErrorHandler_1.default("No Account Found", statusCodes_1.default.BAD_REQUEST, "No account was found in the database");
exports.MongoUnavaiableError = new ErrorHandler_1.default("Postgres Unavailable", statusCodes_1.default.INTERNAL_SERVER_ERROR, "The database is currently offline.");
exports.JwtFailedError = new ErrorHandler_1.default("JSON Web Token Error", statusCodes_1.default.INTERNAL_SERVER_ERROR, "JSON Web Token failed to create a valid token.");
