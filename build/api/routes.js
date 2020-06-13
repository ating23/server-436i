"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoutes = exports.deleteAccountRoute = exports.updateAccountRoute = exports.getAccountRoute = exports.accountRoutes = exports.resetPasswordRoute = exports.verifyResetRoute = exports.forgotPasswordRoute = exports.signupRoute = exports.loginRoute = exports.authRoutes = exports.verifySessionRoute = exports.sessionRoutes = exports.apiRoute = void 0;
var Route_1 = __importDefault(require("../types/Route"));
var MethodTypes_1 = require("../types/MethodTypes");
exports.apiRoute = "/";
/**
 * @Session Routes
 */
exports.sessionRoutes = "/session";
exports.verifySessionRoute = new Route_1.default(MethodTypes_1.MethodTypes.POST, exports.sessionRoutes, "/verify");
/**
 * @Account Routes
 */
exports.authRoutes = "/auth";
exports.loginRoute = new Route_1.default(MethodTypes_1.MethodTypes.POST, exports.authRoutes, "/login");
exports.signupRoute = new Route_1.default(MethodTypes_1.MethodTypes.POST, exports.authRoutes, "/signup");
exports.forgotPasswordRoute = new Route_1.default(MethodTypes_1.MethodTypes.POST, exports.authRoutes, "/forgot");
exports.verifyResetRoute = new Route_1.default(MethodTypes_1.MethodTypes.GET, exports.authRoutes, "/verify");
exports.resetPasswordRoute = new Route_1.default(MethodTypes_1.MethodTypes.POST, exports.authRoutes, "/reset");
/**
 * @AccountRoutes
 */
exports.accountRoutes = "/profile";
exports.getAccountRoute = new Route_1.default(MethodTypes_1.MethodTypes.GET, exports.accountRoutes, "/:accountId");
exports.updateAccountRoute = new Route_1.default(MethodTypes_1.MethodTypes.PATCH, exports.accountRoutes, "/:accountId");
exports.deleteAccountRoute = new Route_1.default(MethodTypes_1.MethodTypes.DELETE, exports.accountRoutes, "/:accountId");
/**
 * @TestRoutes
 */
exports.testRoutes = "/test";
