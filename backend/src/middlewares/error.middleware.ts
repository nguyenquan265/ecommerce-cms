import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorCode = 500
  let errorMsg = 'Something went wrong.'

  console.log('****************')
  console.log('****************')
  console.log(error)
  console.log('****************')
  console.log('****************')

  if (error instanceof ApiError) {
    errorCode = error.statusCode
    errorMsg = error.message
  }

  res.status(errorCode).json({ error: errorMsg })
}

export default errorHandler
