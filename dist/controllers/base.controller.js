"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const asyncWrapper_1 = require("../utiles/asyncWrapper");
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../config/logger"));
class BaseController {
    constructor() {
        this.asyncWrapperHandler = asyncWrapper_1.asyncWrapper;
    }
    handleResponse(res, message, data, status = constants_1.HTTP_STATUS.OK) {
        res.status(status).json({ message, data });
    }
    handleError(res, error, status = constants_1.HTTP_STATUS.BAD_REQUEST) {
        logger_1.default.error(error.message);
        res.status(status).json({ message: error.message });
    }
}
exports.BaseController = BaseController;
