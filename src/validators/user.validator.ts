import Joi from 'joi'

const baseUserSchema = {
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email supplied',
    'any.required': '"email" is required'
  }),
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'First name must be at least 2 characters',
    'string.max': 'First name cannot exceed 50 characters'
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Last name must be at least 2 characters',
    'string.max': 'Last name cannot exceed 50 characters'
  }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .messages({
      'string.min': 'Password cannot be less than 8 characters',
      'string.pattern.base':
        'Password must contain at least one lowercase, one uppercase, one number, and one special character',
      'any.required': '"password" is required'
    }),
  role: Joi.string().valid('user', 'admin').default('user')
}

export const createUserSchema = Joi.object(baseUserSchema)

export const loginUserSchema = Joi.object({
  email: baseUserSchema.email,
  password: baseUserSchema.password
})
