import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import ApiError from '../utils/ApiError'
import prisma from '../config/prisma'

export const getAllUserStores = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.auth?.userId as string

  const stores = await prisma.store.findMany({
    where: {
      userId
    }
  })

  res.status(200).json(stores ? stores : [])
})

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

export const getUserStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.auth?.userId as string
  const { storeId } = req.params

  const query: {
    where: {
      userId: string
      id?: string
    }
  } = {
    where: {
      userId
    }
  }

  if (storeId && storeId !== 'undefined') {
    query.where = {
      ...query.where,
      id: storeId
    }
  }

  const store = await prisma.store.findFirst(query)

  if (!store) {
    throw new ApiError(404, 'Store not found')
  }

  res.status(200).json(store)
})
