"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../config/logger"));
const errorHandler = (err, req, res, next) => {
    logger_1.default.error('An error occurred:', { error: err.message, stack: err.stack });
    const status = err.status || constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    res.status(status).json({
        message: constants_1.ErrorMessages[err.message] ||
            constants_1.ErrorMessages.INTERNAL_SERVER_ERROR
    });
};
exports.errorHandler = errorHandler;
