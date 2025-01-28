"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const baseUserSchema = {
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid email supplied',
        'any.required': '"email" is required'
    }),
    firstName: joi_1.default.string().min(2).max(50).required().messages({
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name cannot exceed 50 characters'
    }),
    lastName: joi_1.default.string().min(2).max(50).required().messages({
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name cannot exceed 50 characters'
    }),
    password: joi_1.default.string()
        .min(8)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
        'string.min': 'Password cannot be less than 8 characters',
        'string.pattern.base': 'Password must contain at least one lowercase, one uppercase, one number, and one special character',
        'any.required': '"password" is required'
    }),
    role: joi_1.default.string().valid('user', 'admin').default('user')
};
exports.createUserSchema = joi_1.default.object(baseUserSchema);
exports.loginUserSchema = joi_1.default.object({
    email: baseUserSchema.email,
    password: baseUserSchema.password
});
