import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import { createStore, getAllUserStores, getUserStore } from '../controllers/store.controller'

const router = Router()

router
  .route('/')
  .get(clerkMiddleware(), authenticate, getAllUserStores)
  .post(clerkMiddleware(), authenticate, createStore)
router.route('/:storeId').get(clerkMiddleware(), authenticate, getUserStore)

export default router
