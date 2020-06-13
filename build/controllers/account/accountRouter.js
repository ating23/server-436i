"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getAccountHandler_1 = __importDefault(require("./handlers/getAccountHandler"));
var routes_1 = require("../../api/routes");
var accountRouter = express_1.default.Router();
accountRouter.get(routes_1.getAccountRoute.relative, getAccountHandler_1.default);
// accountRouter.patch(updateAccountRoute.relative, updateAccountHandler)
// accountRouter.delete(deleteAccountRoute.relative, deleteAccountHandler)
exports.default = accountRouter;
