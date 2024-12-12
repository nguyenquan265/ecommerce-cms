import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import prisma from '../config/prisma'
import ApiError from '../utils/ApiError'

export const getAllSizesFromStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const sizes = await prisma.size.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(sizes)
})

export const getSingleSize = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { sizeId } = req.params

  if (!sizeId) {
    throw new ApiError(400, 'Size ID is required')
  }

  const size = await prisma.size.findUnique({
    where: {
      id: sizeId
    }
  })

  if (!size) {
    throw new ApiError(404, 'Size not found')
  }

  res.status(200).json(size)
})

interface CreateSizeRequest extends Request {
  body: {
    name: string
    value: string
  }
}

export const createSize = asyncHandler(async (req: CreateSizeRequest, res: Response, next: NextFunction) => {
  const { name, value } = req.body
  const { storeId } = req.params
  const userId = req.auth?.userId as string

  if (!name || !value) {
    throw new ApiError(400, 'Name and value are required')
  }

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
      userId
    }
  })

  if (!store) {
    throw new ApiError(404, 'Store not found')
  }

  const size = await prisma.size.create({
    data: {
      name,
      value,
      storeId
    }
  })

  res.status(201).json(size)
})

interface UpdateSizeRequest extends Request {
  body: {
    name: string
    value: string
  }
}

export const updateSize = asyncHandler(async (req: UpdateSizeRequest, res: Response, next: NextFunction) => {
  const { storeId, sizeId } = req.params
  const { name, value } = req.body
  const userId = req.auth?.userId as string

  if (!sizeId) {
    throw new ApiError(400, 'Size ID is required')
  }

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!name || !value) {
    throw new ApiError(400, 'Name and value are required')
  }

  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
      userId
    }
  })

  if (!store) {
    throw new ApiError(404, 'Store not found')
  }

  const size = await prisma.size.update({
    where: {
      id: sizeId
    },
    data: {
      name,
      value
    }
  })

  res.status(200).json(size)
})

export const deleteSize = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId, sizeId } = req.params
  const userId = req.auth?.userId as string

  if (!sizeId) {
    throw new ApiError(400, 'Size ID is required')
  }

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
      userId
    }
  })

  if (!store) {
    throw new ApiError(404, 'Store not found')
  }

  await prisma.size.delete({
    where: {
      id: sizeId
    }
  })

  res.status(204).json({})
})
