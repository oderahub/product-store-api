"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(8).max(100).required().messages({
        'string.min': constants_1.ErrorMessages.PRODUCT_NAME_MIN_LEGNTH_ERROR,
        'string.max': constants_1.ErrorMessages.PRODUCT_NAME_MAX_LEGNTH_ERROR
    }),
    price: joi_1.default.number().positive().required().messages({
        'number.base': constants_1.ErrorMessages.PRODUCT_PRICE_VALIDITY
    }),
    description: joi_1.default.string().min(100).allow('').messages({
        'string.min': constants_1.ErrorMessages.PRODUCT_DESCRIPTION_MIN_LEGNTH_ERROR
    }),
    category: joi_1.default.string().required()
});
exports.updateProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(8).max(100).messages({
        'string.min': constants_1.ErrorMessages.PRODUCT_NAME_MIN_LEGNTH_ERROR,
        'string.max': constants_1.ErrorMessages.PRODUCT_NAME_MAX_LEGNTH_ERROR
    }),
    price: joi_1.default.number().positive().messages({
        'number.base': constants_1.ErrorMessages.PRODUCT_PRICE_VALIDITY
    }),
    description: joi_1.default.string().min(100).allow('').messages({
        'string.min': constants_1.ErrorMessages.PRODUCT_DESCRIPTION_MIN_LEGNTH_ERROR
    }),
    category: joi_1.default.string()
}).min(1);
