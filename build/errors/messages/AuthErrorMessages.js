"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLoginError = exports.EmailDoesNotExistError = exports.PasswordsDontMatchError = exports.EmailInvalidError = void 0;
var ErrorHandler_1 = __importDefault(require("../ErrorHandler"));
var statusCodes_1 = __importDefault(require("../../api/statusCodes"));
exports.EmailInvalidError = new ErrorHandler_1.default("Email Error: Email Invalid", statusCodes_1.default.BAD_REQUEST, "Please enter a valid email address.");
exports.PasswordsDontMatchError = new ErrorHandler_1.default("Password Error: Passwords Don't Match", statusCodes_1.default.BAD_REQUEST, "Please enter matching passwords for both fields.");
exports.EmailDoesNotExistError = new ErrorHandler_1.default("Email Error", statusCodes_1.default.BAD_REQUEST, "The email provided does not exist.");
exports.InvalidLoginError = new ErrorHandler_1.default("Password Error", statusCodes_1.default.BAD_REQUEST, "The email and password you entered does not match our records.");
