"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = exports.NoTokenError = void 0;
var ErrorHandler_1 = __importDefault(require("../ErrorHandler"));
var statusCodes_1 = __importDefault(require("../../api/statusCodes"));
/**
 * @Authorization Errors
 *
 * When no bearer token is provided to an protected route.
 */
exports.NoTokenError = new ErrorHandler_1.default("Authorization Error", statusCodes_1.default.BAD_REQUEST, "No authorization token provided.");
exports.InvalidTokenError = new ErrorHandler_1.default("Authorization Error", statusCodes_1.default.BAD_REQUEST, "Invalid authorization token provided.");
