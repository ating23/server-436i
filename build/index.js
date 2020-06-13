"use strict";
// https://expressjs.com/en/advanced/best-practice-performance.html
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
var api_1 = __importDefault(require("./api/api"));
var routes_1 = require("./api/routes");
var startServer_1 = __importDefault(require("./config/startServer"));
/**
 * @Errors
 */
var LogErrorHandler_1 = __importDefault(require("./errors/LogErrorHandler"));
var catchAllErrorHandler_1 = __importDefault(require("./errors/handlers/catchAllErrorHandler"));
var Logger_1 = __importDefault(require("./errors/Logger"));
/**
 * @Connect Mongoose
 */
var db = mongoose_1.default.connection;
mongoose_1.default.connect(String(process.env.MONGODB_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    Logger_1.default.Log("Mongoose running.");
});
var PORT = process.env.SERVER_PORT || 5000;
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(routes_1.apiRoute, api_1.default);
/**
 * @Error Handling
 */
app.use(LogErrorHandler_1.default);
app.use(catchAllErrorHandler_1.default);
/**
 * @Server Startup
 */
app.listen(PORT, startServer_1.default);
