import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import { getAllOrdersFromStore } from '../controllers/order.controller'

const router = Router()

router.route('/store/:storeId').get(getAllOrdersFromStore).post(clerkMiddleware(), authenticate)

export default router
