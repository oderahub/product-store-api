import Joi from 'joi'
import logger from '../config/logger'
import { ErrorMessages, UserRoles } from '../constants'

export const validateSchema = (data: any, schema: Joi.ObjectSchema, context: string) => {
  const { error } = schema.validate(data)
  if (error) {
    logger.error(`Validation error in ${context}`, { error: error.message })
    throw new Error(error.details[0].message)
  }
}

export const checkOwnership = (
  ownerId: string,
  userId: string,
  userRole: string,
  message: ErrorMessages
) => {
  if (userRole !== UserRoles.ADMIN && ownerId !== userId) {
    throw new Error(message)
  }
}
