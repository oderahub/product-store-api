import { Request, Response, NextFunction } from 'express'
import { ErrorMessages, HTTP_STATUS } from '../constants'
import logger from '../config/logger'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('An error occurred:', { error: err.message, stack: err.stack })

  const status = (err as any).status || HTTP_STATUS.INTERNAL_SERVER_ERROR
  res.status(status).json({
    message:
      ErrorMessages[err.message as keyof typeof ErrorMessages] ||
      ErrorMessages.INTERNAL_SERVER_ERROR
  })
}
