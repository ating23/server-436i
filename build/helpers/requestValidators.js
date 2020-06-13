"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordConfirm = exports.validatePassword = exports.validateEmail = void 0;
var express_validator_1 = require("express-validator");
exports.validateEmail = express_validator_1.body("email")
    .trim()
    .notEmpty().withMessage("Please enter an email address.")
    .isEmail().withMessage("Please enter a valid email address.")
    .normalizeEmail();
exports.validatePassword = express_validator_1.check("password")
    .notEmpty().withMessage("Please enter a password.")
    .isLength({ min: 8 }).withMessage("Please enter a password with at least 8 characters.");
exports.validatePasswordConfirm = express_validator_1.check("passwordConfirmation")
    .notEmpty().withMessage("Please provide a password.")
    .isLength({ min: 8 }).withMessage("Please provide a password with at least 8 characters long.")
    .custom(function (inputPwdConfirm, _a) {
    var req = _a.req;
    if (inputPwdConfirm !== req.body.password) {
        throw Error("Passwords do not match.");
    }
    // Indicates the success of this synchronous custom validator
    return true;
});
