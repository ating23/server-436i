"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorizationToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Logger_1 = __importDefault(require("../../../errors/Logger"));
var AccessErrorMessages_1 = require("../../../errors/messages/AccessErrorMessages");
var jwtConfig_1 = require("../../../config/jwtConfig");
function verifyAuthorizationToken(req, res, next) {
    var bearerHeader = req.headers["authorization"];
    Logger_1.default.Log("Header: ", bearerHeader);
    if (!bearerHeader || bearerHeader === "") {
        Logger_1.default.Error("Did not find a bearer token.");
        return next(AccessErrorMessages_1.NoTokenError);
    }
    else {
        var token = bearerHeader.split(" ")[1];
        var decoded = jsonwebtoken_1.default.verify(token, jwtConfig_1.SECRET_OR_PRIVATE_KEY);
        if (!decoded) {
            Logger_1.default.Error("The jwt token did not successfully verify.");
            return next(AccessErrorMessages_1.InvalidTokenError);
        }
        Logger_1.default.Log("Token successfully found on server. Decoded: ", decoded);
        res.locals.token = decoded;
        return next();
    }
}
exports.verifyAuthorizationToken = verifyAuthorizationToken;
