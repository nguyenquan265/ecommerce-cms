import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth || !req.auth.userId) {
    next(new ApiError(401, 'You must be logged in to access this resource'))
  }

  next()
}
