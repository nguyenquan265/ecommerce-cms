import { Router } from 'express'
import { createOrder, getAllOrdersFromStore, getOverview, stripeWebhookHandler } from '../controllers/order.controller'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.route('/checkout/webhook').post(stripeWebhookHandler)
router.route('/store/:storeId').get(clerkMiddleware(), authenticate, getAllOrdersFromStore).post(createOrder)
router.route('/store/:storeId/overview').get(clerkMiddleware(), authenticate, getOverview)

export default router
