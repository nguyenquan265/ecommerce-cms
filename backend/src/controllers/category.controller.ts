import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import prisma from '../config/prisma'
import ApiError from '../utils/ApiError'

export const getAllCategoriesFromStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const categories = await prisma.category.findMany({
    where: {
      storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(categories)
})

export const getSingleCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params

  if (!categoryId) {
    throw new ApiError(400, 'Category ID is required')
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId
    }
  })

  if (!category) {
    throw new ApiError(404, 'Category not found')
  }

  res.status(200).json(category)
})

interface CreateCategoryRequest extends Request {
  body: {
    name: string
    billboardId: string
  }
}

export const createCategory = asyncHandler(async (req: CreateCategoryRequest, res: Response, next: NextFunction) => {
  const { name, billboardId } = req.body
  const { storeId } = req.params
  const userId = req.auth?.userId as string

  if (!name || !billboardId) {
    throw new ApiError(400, 'Name and billboard ID are required')
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

  const category = await prisma.category.create({
    data: {
      name,
      billboardId,
      storeId
    }
  })

  res.status(201).json(category)
})

interface UpdateCategoryRequest extends Request {
  body: {
    name: string
    billboardId: string
  }
}

export const updateCategory = asyncHandler(async (req: UpdateCategoryRequest, res: Response, next: NextFunction) => {
  const { name, billboardId } = req.body
  const { storeId, categoryId } = req.params
  const userId = req.auth?.userId as string

  if (!name || !billboardId) {
    throw new ApiError(400, 'Name and billboard ID are required')
  }

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!categoryId) {
    throw new ApiError(400, 'Category ID is required')
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

  const category = await prisma.category.update({
    where: {
      id: categoryId
    },
    data: {
      name,
      billboardId
    }
  })

  res.status(200).json(category)
})

export const deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId, categoryId } = req.params
  const userId = req.auth?.userId as string

  if (!categoryId) {
    throw new ApiError(400, 'Category ID is required')
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

  await prisma.category.delete({
    where: {
      id: categoryId
    }
  })

  res.status(204).json({})
})
