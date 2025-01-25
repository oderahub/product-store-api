import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { ErrorMessages, UserRoles } from '../constants'
import logger from '../config/logger'

interface AuthenticatedRequest extends Request {
  user?: { userId: string; role: string }
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    res.status(401).json({ message: ErrorMessages.UNAUTHENTICATED_USER })
    return
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) {
      logger.error('JWT Verification Error', { error: err })
      res.status(403).json({ message: ErrorMessages.INVALID_TOKEN })
    } else {
      req.user = user
      next()
    }
  })
}
export const checkRole =
  (requiredRole: UserRoles) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === requiredRole) {
      next()
    } else {
      res.status(403).json({ message: ErrorMessages.NOT_AUTHORIZED })
    }
  }
