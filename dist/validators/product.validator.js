"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(100).required().messages({
        'string.min': 'Product name cannot be less than 5 characters',
        'string.max': 'Product name cannot be more than 100 characters'
    }),
    price: joi_1.default.number().positive().required().messages({
        'number.base': 'Product price must be a number'
    }),
    description: joi_1.default.string().min(20).allow('').messages({
        'string.min': 'Product description cannot be less than 20 characters'
    }),
    category: joi_1.default.string().required()
});
exports.updateProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(100).messages({
        'string.min': 'Product name cannot be less than 5 characters',
        'string.max': 'Product name cannot be more than 100 characters'
    }),
    price: joi_1.default.number().positive().messages({
        'number.base': 'Product price must be a number'
    }),
    description: joi_1.default.string().min(20).allow('').messages({
        'string.min': 'Product description cannot be less than 20 characters'
    }),
    category: joi_1.default.string()
}).min(1);
