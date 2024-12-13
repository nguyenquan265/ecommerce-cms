import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import {
  createColor,
  deleteColor,
  getAllColorsFromStore,
  getSingleColor,
  updateColor
} from '../controllers/color.controller'

const router = Router()

router.route('/store/:storeId').get(getAllColorsFromStore).post(clerkMiddleware(), authenticate, createColor)
router
  .route('/store/:storeId/:colorId')
  .patch(clerkMiddleware(), authenticate, updateColor)
  .delete(clerkMiddleware(), authenticate, deleteColor)
router.route('/:colorId').get(getSingleColor)

export default router
