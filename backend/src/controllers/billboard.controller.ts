import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import prisma from '../config/prisma'
import ApiError from '../utils/ApiError'

export const getAllBillboardsFromStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(billboards)
})

export const getSingleBillboard = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { billboardId } = req.params

  if (!billboardId) {
    throw new ApiError(400, 'Billboard ID is required')
  }

  const billboard = await prisma.billboard.findUnique({
    where: {
      id: billboardId
    }
  })

  if (!billboard) {
    throw new ApiError(404, 'Billboard not found')
  }

  res.status(200).json(billboard)
})

interface CreateBillboardRequest extends Request {
  body: {
    label: string
    imageUrl: string
  }
}

export const createBillboard = asyncHandler(async (req: CreateBillboardRequest, res: Response, next: NextFunction) => {
  const { label, imageUrl } = req.body
  const { storeId } = req.params
  const userId = req.auth?.userId as string

  if (!label || !imageUrl) {
    throw new ApiError(400, 'Label and image URL are required')
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

  const billboard = await prisma.billboard.create({
    data: {
      storeId,
      label,
      imageUrl
    }
  })

  res.status(201).json(billboard)
})

interface UpdateBillboardRequest extends Request {
  body: {
    label: string
    imageUrl: string
  }
}

export const updateBillboard = asyncHandler(async (req: UpdateBillboardRequest, res: Response, next: NextFunction) => {
  const { label, imageUrl } = req.body
  const { storeId, billboardId } = req.params
  const userId = req.auth?.userId as string

  if (!label || !imageUrl) {
    throw new ApiError(400, 'Label and image URL are required')
  }

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!billboardId) {
    throw new ApiError(400, 'Billboard ID is required')
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

  const billboard = await prisma.billboard.update({
    where: {
      id: billboardId,
      storeId
    },
    data: {
      label,
      imageUrl
    }
  })

  res.status(200).json(billboard)
})

export const deleteBillboard = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId, billboardId } = req.params
  const userId = req.auth?.userId as string

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!billboardId) {
    throw new ApiError(400, 'Billboard ID is required')
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

  await prisma.billboard.delete({
    where: {
      id: billboardId,
      storeId
    }
  })

  res.status(204).json({ message: 'Billboard deleted' })
})
