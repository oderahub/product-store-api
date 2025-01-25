import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { ErrorMessages } from '../constants'

interface AuthenticatedRequest extends Request {
  user?: any
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ message: ErrorMessages.UNAUTHENTICATED_USER })

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: ErrorMessages.INVALID_TOKEN })
    req.user = user
    next()
  })
}
