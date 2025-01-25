// import { Request, Response, NextFunction } from 'express'
// import { ErrorMessages, HTTP_STATUS } from '../constants'
// import logger from '../../config/logger'

// export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   logger.error('An error occurred:', { error: err.message, stack: err.stack })

//   res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
//     message: ErrorMessages[err.message] || ErrorMessages.INTERNAL_SERVER_ERROR
//   })
// }
