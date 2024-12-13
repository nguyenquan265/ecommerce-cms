import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import prisma from '../config/prisma'
import ApiError from '../utils/ApiError'

export const getAllColorsFromStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const colors = await prisma.color.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(colors)
})

export const getSingleColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { colorId } = req.params

  if (!colorId) {
    throw new ApiError(400, 'Color ID is required')
  }

  const color = await prisma.color.findUnique({
    where: {
      id: colorId
    }
  })

  if (!color) {
    throw new ApiError(404, 'Color not found')
  }

  res.status(200).json(color)
})

interface CreateColorRequest extends Request {
  body: {
    name: string
    value: string
  }
}

export const createColor = asyncHandler(async (req: CreateColorRequest, res: Response, next: NextFunction) => {
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

  const color = await prisma.color.create({
    data: {
      name,
      value,
      storeId
    }
  })

  res.status(201).json(color)
})

interface UpdateColorRequest extends Request {
  body: {
    name: string
    value: string
  }
}

export const updateColor = asyncHandler(async (req: UpdateColorRequest, res: Response, next: NextFunction) => {
  const { name, value } = req.body
  const { storeId, colorId } = req.params
  const userId = req.auth?.userId as string

  if (!name || !value) {
    throw new ApiError(400, 'Name and value are required')
  }

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!colorId) {
    throw new ApiError(400, 'Color ID is required')
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

  const color = await prisma.color.update({
    where: {
      id: colorId
    },
    data: {
      name,
      value
    }
  })

  res.status(200).json(color)
})

export const deleteColor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId, colorId } = req.params
  const userId = req.auth?.userId as string

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!colorId) {
    throw new ApiError(400, 'Color ID is required')
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

  await prisma.color.delete({
    where: {
      id: colorId
    }
  })

  res.status(200).json({ message: 'Color deleted' })
})
