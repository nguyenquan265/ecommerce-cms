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
  const { storeId } = req.params

  const store = await prisma.store.findFirst({
    where: {
      id: storeId
    }
  })

  if (!store) {
    throw new ApiError(404, 'Store not found')
  }

  res.status(200).json(store)
})

interface UpdateStoreRequest extends Request {
  body: {
    name: string
  }
}

export const updateUserStore = asyncHandler(async (req: UpdateStoreRequest, res: Response, next: NextFunction) => {
  const userId = req.auth?.userId as string
  const { storeId } = req.params
  const { name } = req.body

  if (!name) {
    throw new ApiError(400, 'Name is required')
  }

  const store = await prisma.store.update({
    where: {
      id: storeId,
      userId
    },
    data: {
      name
    }
  })

  res.status(200).json(store)
})

export const deleteUserStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.auth?.userId as string
  const { storeId } = req.params

  await prisma.store.delete({
    where: {
      id: storeId,
      userId
    }
  })

  res.status(204).json()
})
