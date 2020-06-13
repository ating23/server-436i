"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var accountRouter_1 = __importDefault(require("../controllers/account/accountRouter"));
var authRouter_1 = __importDefault(require("../controllers/auth/authRouter"));
var testRouter_1 = __importDefault(require("../controllers/test/testRouter"));
var routes_1 = require("./routes");
var verifyAuthorizationToken_1 = require("../controllers/auth/helpers/verifyAuthorizationToken");
var api = express_1.default();
api.use(routes_1.accountRoutes, verifyAuthorizationToken_1.verifyAuthorizationToken, accountRouter_1.default);
api.use(routes_1.authRoutes, authRouter_1.default);
// api.use(sessionRoutes, sessionRouter)
api.use(routes_1.testRoutes, testRouter_1.default);
exports.default = api;
