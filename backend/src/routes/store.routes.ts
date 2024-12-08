import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import {
  createStore,
  deleteUserStore,
  getAllUserStores,
  getUserStore,
  updateUserStore
} from '../controllers/store.controller'

const router = Router()

router
  .route('/')
  .get(clerkMiddleware(), authenticate, getAllUserStores)
  .post(clerkMiddleware(), authenticate, createStore)
router
  .route('/:storeId')
  .get(clerkMiddleware(), authenticate, getUserStore)
  .patch(clerkMiddleware(), authenticate, updateUserStore)
  .delete(clerkMiddleware(), authenticate, deleteUserStore)

export default router
