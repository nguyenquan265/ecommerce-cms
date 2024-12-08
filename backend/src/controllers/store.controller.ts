import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import ApiError from '../utils/ApiError'
import prisma from '../config/prisma'

interface CreateStoreRequest extends Request {
  body: {
    name: string
  }
}

export const createStore = asyncHandler(async (req: CreateStoreRequest, res: Response, next: NextFunction) => {
  const { name } = req.body

  if (!name) {
    throw new ApiError(400, 'Name is required')
  }

  const store = await prisma.store.create({
    data: {
      name,
      userId: req.auth?.userId as string
    }
  })

  res.status(201).json(store)
})
