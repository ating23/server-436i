"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountResponse = exports.GetAccountResponse = void 0;
var GetAccountResponse = /** @class */ (function () {
    function GetAccountResponse(accountId, accessToken, name, email, createdOn) {
        this.account = {
            accountId: accountId,
            accessToken: accessToken,
            name: name,
            email: email,
            createdOn: createdOn
        };
    }
    return GetAccountResponse;
}());
exports.GetAccountResponse = GetAccountResponse;
var UpdateAccountResponse = /** @class */ (function () {
    function UpdateAccountResponse() {
    }
    return UpdateAccountResponse;
}());
exports.UpdateAccountResponse = UpdateAccountResponse;
