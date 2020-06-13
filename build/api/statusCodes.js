"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var statusCodes;
(function (statusCodes) {
    /** 1xx : Informational Requests */
    statusCodes[statusCodes["CONTINUE"] = 100] = "CONTINUE";
    statusCodes[statusCodes["SWITCHING_PROTOCOL"] = 101] = "SWITCHING_PROTOCOL";
    statusCodes[statusCodes["CHECKPOINT"] = 103] = "CHECKPOINT";
    /** 2xx : Success Requests */
    statusCodes[statusCodes["OK"] = 200] = "OK";
    statusCodes[statusCodes["CREATED"] = 201] = "CREATED";
    statusCodes[statusCodes["ACCEPTED"] = 202] = "ACCEPTED";
    statusCodes[statusCodes["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    statusCodes[statusCodes["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    /** 3xx : Redirection */
    statusCodes[statusCodes["MOVED_PERMANENTLY"] = 300] = "MOVED_PERMANENTLY";
    statusCodes[statusCodes["FOUND"] = 300] = "FOUND";
    statusCodes[statusCodes["NOT_MODIFIED"] = 300] = "NOT_MODIFIED";
    statusCodes[statusCodes["USE_PROXY"] = 300] = "USE_PROXY";
    statusCodes[statusCodes["TEMPORARY_REDIRECT"] = 300] = "TEMPORARY_REDIRECT";
    /** 4xx : Client Error */
    statusCodes[statusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    statusCodes[statusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    statusCodes[statusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    statusCodes[statusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    statusCodes[statusCodes["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    statusCodes[statusCodes["GONE"] = 410] = "GONE";
    statusCodes[statusCodes["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    /** 5xx : Server Error */
    statusCodes[statusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    statusCodes[statusCodes["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    statusCodes[statusCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    statusCodes[statusCodes["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(statusCodes || (statusCodes = {}));
exports.default = statusCodes;
