import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import prisma from '../config/prisma'
import ApiError from '../utils/ApiError'
import Stripe from 'stripe'
import stripe from '../config/stripe'

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

interface CreateOrderRequest extends Request {
  productIds: string[]
}

export const createOrder = asyncHandler(async (req: CreateOrderRequest, res: Response, next: NextFunction) => {
  const { productIds } = req.body
  const { storeId } = req.params

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  if (!productIds || productIds.length === 0) {
    throw new ApiError(400, 'Product IDs are required')
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  products.forEach((product) => {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name
        },
        unit_amount: product.price.toNumber() * 100
      },
      quantity: 1
    })
  })

  const order = await prisma.order.create({
    data: {
      storeId,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.CLIENT_URL}/cart?success=1`,
    cancel_url: `${process.env.CLIENT_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    }
  })

  if (!session.url) {
    throw new ApiError(500, 'Failed to create checkout session')
  }

  res.status(201).json(session.url)
})

export const stripeWebhookHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature']
  const event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET as string)
  const session = event.data.object as Stripe.Checkout.Session
  const address = session.customer_details?.address
  const addressDetail = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ]
  const addressString = addressDetail.filter(Boolean).join(', ')

  if (event.type === 'checkout.session.completed') {
    await prisma.order.update({
      where: {
        id: session?.metadata?.orderId
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session.customer_details?.phone || ''
      },
      include: {
        orderItems: true
      }
    })
  }

  res.status(200).json()
})

interface GraphData {
  name: string
  total: number
}

export const getOverview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params
  const userId = req.auth?.userId as string

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

  const [paidOrders, salesCount] = await Promise.all([
    prisma.order.findMany({
      where: {
        storeId,
        isPaid: true
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    }),
    prisma.order.count({
      where: {
        storeId,
        isPaid: true
      }
    })
  ])

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + Number(item.product.price)
    }, 0)
    return total + orderTotal
  }, 0)

  const monthlyRevenue: { [key: number]: number } = {}

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth()
    let revenueForOrder = 0

    for (const item of order.orderItems) {
      revenueForOrder += Number(item.product.price)
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
  }

  const graphData: GraphData[] = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 }
  ]

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
  }

  res.status(200).json({
    totalRevenue,
    salesCount,
    graphData
  })
})
