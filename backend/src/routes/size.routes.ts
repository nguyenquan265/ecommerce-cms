import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import { createSize, deleteSize, getAllSizesFromStore, getSingleSize, updateSize } from '../controllers/size.controller'

const router = Router()

router.route('/store/:storeId').get(getAllSizesFromStore).post(clerkMiddleware(), authenticate, createSize)
router
  .route('/store/:storeId/:sizeId')
  .patch(clerkMiddleware(), authenticate, updateSize)
  .delete(clerkMiddleware(), authenticate, deleteSize)
router.route('/:sizeId').get(getSingleSize)

export default router
