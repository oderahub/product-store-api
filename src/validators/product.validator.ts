import Joi from 'joi'

export const createProductSchema = Joi.object({
  name: Joi.string().min(5).max(100).required().messages({
    'string.min': 'Product name cannot be less than 5 characters',
    'string.max': 'Product name cannot be more than 100 characters'
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Product price must be a number'
  }),
  description: Joi.string().min(20).allow('').messages({
    'string.min': 'Product description cannot be less than 20 characters'
  }),
  category: Joi.string().required()
})

export const updateProductSchema = Joi.object({
  name: Joi.string().min(5).max(100).messages({
    'string.min': 'Product name cannot be less than 5 characters',
    'string.max': 'Product name cannot be more than 100 characters'
  }),
  price: Joi.number().positive().messages({
    'number.base': 'Product price must be a number'
  }),
  description: Joi.string().min(20).allow('').messages({
    'string.min': 'Product description cannot be less than 20 characters'
  }),
  category: Joi.string()
}).min(1)
