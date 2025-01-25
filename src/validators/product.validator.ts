import Joi from 'joi'
import { ErrorMessages } from '../constants'

export const createProductSchema = Joi.object({
  name: Joi.string().min(8).max(100).required().messages({
    'string.min': ErrorMessages.PRODUCT_NAME_MIN_LEGNTH_ERROR,
    'string.max': ErrorMessages.PRODUCT_NAME_MAX_LEGNTH_ERROR
  }),
  price: Joi.number().positive().required().messages({
    'number.base': ErrorMessages.PRODUCT_PRICE_VALIDITY
  }),
  description: Joi.string().min(100).allow('').messages({
    'string.min': ErrorMessages.PRODUCT_DESCRIPTION_MIN_LEGNTH_ERROR
  }),
  category: Joi.string().required()
})

export const updateProductSchema = Joi.object({
  name: Joi.string().min(8).max(100).messages({
    'string.min': ErrorMessages.PRODUCT_NAME_MIN_LEGNTH_ERROR,
    'string.max': ErrorMessages.PRODUCT_NAME_MAX_LEGNTH_ERROR
  }),
  price: Joi.number().positive().messages({
    'number.base': ErrorMessages.PRODUCT_PRICE_VALIDITY
  }),
  description: Joi.string().min(100).allow('').messages({
    'string.min': ErrorMessages.PRODUCT_DESCRIPTION_MIN_LEGNTH_ERROR
  }),
  category: Joi.string()
}).min(1)
