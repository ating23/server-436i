"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthorizationToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtConfig_1 = require("../../../config/jwtConfig");
function generateAuthorizationToken(payload, providedSecret) {
    var secret = providedSecret || jwtConfig_1.SECRET_OR_PRIVATE_KEY;
    return new Promise(function (resolve, reject) {
        var token = jsonwebtoken_1.default.sign(payload, secret, jwtConfig_1.jwtConfig);
        // Logger.Log ("Generated token: ", token)
        if (!token)
            return reject(token);
        else
            return resolve(token);
    });
}
exports.generateAuthorizationToken = generateAuthorizationToken;
