"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.SECRET_OR_PRIVATE_KEY = void 0;
var NUM_DAYS = 7;
var NUM_HOURS = 24;
var NUM_MINUTES = 60;
var NUM_SECONDS = 60;
exports.SECRET_OR_PRIVATE_KEY = process.env.JWT_KEY || "MYPRIVATEKEY";
exports.jwtConfig = {
    expiresIn: (NUM_DAYS * NUM_HOURS * NUM_MINUTES * NUM_SECONDS),
};
