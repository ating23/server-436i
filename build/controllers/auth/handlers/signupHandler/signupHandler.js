"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Account_model_1 = __importDefault(require("../../../../db/models/Account.model"));
var signupValidators_1 = require("./signupValidators");
var requestValidators_1 = require("../../../../helpers/requestValidators");
var Logger_1 = __importDefault(require("../../../../errors/Logger"));
var generateAuthorizationToken_1 = require("../../helpers/generateAuthorizationToken");
var statusCodes_1 = __importDefault(require("../../../../api/statusCodes"));
var generateURI_1 = __importDefault(require("../../helpers/generateURI"));
function handleSignup(req, res, next) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    Logger_1.default.Log("Received request for " + name);
    var salt = bcryptjs_1.default.genSaltSync(10);
    var passwordHash = bcryptjs_1.default.hashSync(password, salt);
    Logger_1.default.Log("Generated password hash.");
    var newAccount = new Account_model_1.default({ name: name, email: email, password: passwordHash });
    newAccount.save(function (err, account) {
        if (err) {
            Logger_1.default.Error("Error in saving new account on mongodb.");
            return next(err);
        }
        Logger_1.default.Log("Saved new account on mongodb.");
        var id = account._id;
        generateAuthorizationToken_1.generateAuthorizationToken({ id: id })
            .then(function (token) {
            Logger_1.default.Log("Token generated. Responding to client: ", token);
            return res.status(statusCodes_1.default.CREATED).json({
                token: token,
                profile: generateURI_1.default("/profile/" + id)
            });
        })
            .catch(function (error) { return next(error); });
    });
}
var signupHandler = [
    signupValidators_1.validateName,
    requestValidators_1.validateEmail,
    requestValidators_1.validatePassword,
    requestValidators_1.validatePasswordConfirm,
    signupValidators_1.validateEmailAlreadyExists,
    signupValidators_1.handleErrors,
    handleSignup
];
exports.default = signupHandler;
