import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import prisma from '../config/prisma'
import ApiError from '../utils/ApiError'

export const getAllOrdersFromStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const orders = await prisma.order.findMany({
    where: {
      storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(orders)
})
