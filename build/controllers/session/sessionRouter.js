"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var routes_1 = require("../../api/routes");
var statusCodes_1 = __importDefault(require("../../api/statusCodes"));
var jwtConfig_1 = require("../../config/jwtConfig");
var sessionRouter = express_1.default.Router();
sessionRouter.post(routes_1.verifySessionRoute.relative, function (req, res, next) {
    var token = req.body.token;
    if (!token) {
        return next(new Error("No access token was provided."));
    }
    var decoded = jsonwebtoken_1.default.verify(token, jwtConfig_1.SECRET_OR_PRIVATE_KEY);
    if (!decoded) {
        return res.status(statusCodes_1.default.BAD_REQUEST).send({ error: decoded });
    }
    return res.sendStatus(statusCodes_1.default.ACCEPTED);
});
exports.default = sessionRouter;
