import { Response } from 'express'
import { asyncWrapper } from '../utiles/asyncWrapper'
import { HTTP_STATUS } from '../constants'
import logger from '../config/logger'

export abstract class BaseController<T> {
  protected asyncWrapperHandler = asyncWrapper

  protected handleResponse<TResponse>(
    res: Response,
    message: string,
    data: TResponse | TResponse[] | null,
    status: number = HTTP_STATUS.OK
  ) {
    res.status(status).json({ message, data })
  }

  protected handleError(res: Response, error: Error, status: number = HTTP_STATUS.BAD_REQUEST) {
    logger.error(error.message)
    res.status(status).json({ message: error.message })
  }
}
