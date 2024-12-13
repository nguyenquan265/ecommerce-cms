import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import prisma from '../config/prisma'
import ApiError from '../utils/ApiError'

export const getAllProductsFromStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params
  const { categoryId, sizeId, colorId, isFeatured, isArchived } = req.query

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const products = await prisma.product.findMany({
    where: {
      storeId,
      categoryId: categoryId ? (categoryId as string) : undefined,
      sizeId: sizeId ? (sizeId as string) : undefined,
      colorId: colorId ? (colorId as string) : undefined,
      isFeatured: isFeatured ? isFeatured === 'true' : undefined,
      isArchived: isArchived ? isArchived === 'true' : undefined
    },
    include: {
      category: true,
      size: true,
      color: true,
      images: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(products)
})

export const getSingleProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params

  if (!productId) {
    throw new ApiError(400, 'Product ID is required')
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId
    },
    include: {
      category: true,
      size: true,
      color: true,
      images: true
    }
  })

  if (!product) {
    throw new ApiError(404, 'Product not found')
  }

  res.status(200).json(product)
})

interface CreateProductRequest extends Request {
  body: {
    name: string
    price: number
    categoryId: string
    sizeId: string
    colorId: string
    images: {
      url: string
    }[]
    isFeatured?: boolean
    isArchived?: boolean
  }
}

export const createProduct = asyncHandler(async (req: CreateProductRequest, res: Response, next: NextFunction) => {
  const { storeId } = req.params
  const userId = req.auth?.userId as string
  const { name, price, categoryId, sizeId, colorId, images, isArchived, isFeatured } = req.body

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!name || !price || !categoryId || !sizeId || !colorId) {
    throw new ApiError(400, 'All fields are required')
  }

  if (!images || images.length === 0) {
    throw new ApiError(400, 'At least one image is required')
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

  const product = await prisma.product.create({
    data: {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      storeId,
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)]
        }
      },
      isFeatured,
      isArchived
    }
  })

  res.status(201).json(product)
})

interface UpdateProductRequest extends Request {
  body: {
    name: string
    price: number
    categoryId: string
    sizeId: string
    colorId: string
    images: {
      url: string
    }[]
    isFeatured?: boolean
    isArchived?: boolean
  }
}

export const updateProduct = asyncHandler(async (req: UpdateProductRequest, res: Response, next: NextFunction) => {
  const { storeId, productId } = req.params
  const userId = req.auth?.userId as string
  const { name, price, categoryId, sizeId, colorId, images, isArchived, isFeatured } = req.body

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!productId) {
    throw new ApiError(400, 'Product ID is required')
  }

  if (!name || !price || !categoryId || !sizeId || !colorId) {
    throw new ApiError(400, 'All fields are required')
  }

  if (!images || images.length === 0) {
    throw new ApiError(400, 'At least one image is required')
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

  await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images: {
        deleteMany: {}
      },
      isFeatured,
      isArchived
    }
  })

  const product = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)]
        }
      }
    }
  })

  res.status(200).json(product)
})

export const deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId, productId } = req.params
  const userId = req.auth?.userId as string

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!productId) {
    throw new ApiError(400, 'Product ID is required')
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

  await prisma.product.delete({
    where: {
      id: productId
    }
  })

  res.status(200).json({ message: 'Product deleted' })
})
