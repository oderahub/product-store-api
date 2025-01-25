"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    username: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid email supplied'
    }),
    password: joi_1.default.string()
        .min(8)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
        'string.min': 'Password cannot be less than 8 characters',
        'string.pattern.base': 'Password must contain at least one lowercase, one uppercase, one number and one special character'
    }),
    role: joi_1.default.string().valid('user', 'admin').default('user')
});
exports.loginUserSchema = joi_1.default.object({
    username: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid email supplied'
    }),
    password: joi_1.default.string().required()
});
