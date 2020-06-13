"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordResponse = exports.AuthorizationResponse = void 0;
var AuthorizationResponse = /** @class */ (function () {
    function AuthorizationResponse(accessToken) {
        this.accessToken = accessToken;
    }
    return AuthorizationResponse;
}());
exports.AuthorizationResponse = AuthorizationResponse;
var ResetPasswordResponse = /** @class */ (function () {
    function ResetPasswordResponse(accountId, accessToken) {
        this.accoundId = accountId;
        this.accessToken = accessToken;
    }
    return ResetPasswordResponse;
}());
exports.ResetPasswordResponse = ResetPasswordResponse;
