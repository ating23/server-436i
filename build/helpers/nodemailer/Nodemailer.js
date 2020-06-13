"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_mailgun_transport_1 = __importDefault(require("nodemailer-mailgun-transport"));
var ErrorHandler_1 = __importDefault(require("../../errors/ErrorHandler"));
var statusCodes_1 = __importDefault(require("../../api/statusCodes"));
var mailgunConfig_1 = require("./mailgunConfig");
var Logger_1 = __importDefault(require("../../errors/Logger"));
var Nodemailer = /** @class */ (function () {
    function Nodemailer(toName, toEmail, subject, htmlBody) {
        this.toName = toName;
        this.toEmail = toEmail;
        this.subject = subject;
        this.htmlBody = htmlBody;
    }
    Nodemailer.prototype.sendMail = function () {
        var _a = this, toName = _a.toName, toEmail = _a.toEmail, subject = _a.subject, htmlBody = _a.htmlBody;
        return new Promise(function (resolve, reject) {
            var MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
            if (!MAILGUN_API_KEY) {
                return reject(new ErrorHandler_1.default("Mailgun Undefined", statusCodes_1.default.INTERNAL_SERVER_ERROR, "Mailgun is undefined."));
            }
            // Defines connection data
            var authOptions = {
                // eslint-disable-next-line @typescript-eslint/camelcase
                api_key: MAILGUN_API_KEY,
                domain: mailgunConfig_1.MAILGUN_CONFIG.domain
            };
            var auth = { auth: authOptions };
            var transporter = nodemailer_1.default.createTransport(nodemailer_mailgun_transport_1.default(auth));
            return transporter.sendMail({
                from: mailgunConfig_1.MAILGUN_CONFIG.sender,
                to: toName + " <" + toEmail + ">",
                subject: subject,
                html: htmlBody
            })
                .then(function (info) {
                Logger_1.default.Log("Successully sent mail: ", info);
                return resolve(info);
            })
                .catch(function (error) {
                Logger_1.default.Error("Error in sending mail: ", error);
                return reject(error);
            });
        });
    };
    return Nodemailer;
}());
exports.default = Nodemailer;
