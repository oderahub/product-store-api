import Joi from 'joi'
import { ErrorMessages } from '../constants'

export const createUserSchema = Joi.object({
  username: Joi.string().email().required().messages({
    'string.email': 'Invalid email supplied'
  }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .messages({
      'string.min': 'Password cannot be less than 8 characters',
      'string.pattern.base':
        'Password must contain at least one lowercase, one uppercase, one number and one special character'
    }),
  role: Joi.string().valid('user', 'admin').default('user')
})

export const loginUserSchema = Joi.object({
  username: Joi.string().email().required().messages({
    'string.email': 'Invalid email supplied'
  }),
  password: Joi.string().required()
})
