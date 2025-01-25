"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOwnership = exports.validateSchema = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const constants_1 = require("../constants");
const validateSchema = (data, schema, context) => {
    const { error } = schema.validate(data);
    if (error) {
        logger_1.default.error(`Validation error in ${context}`, { error: error.message });
        throw new Error(error.details[0].message);
    }
};
exports.validateSchema = validateSchema;
const checkOwnership = (ownerId, userId, userRole, message) => {
    if (userRole !== constants_1.UserRoles.ADMIN && ownerId !== userId) {
        throw new Error(message);
    }
};
exports.checkOwnership = checkOwnership;
