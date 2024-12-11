import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import {
  createBillboard,
  deleteBillboard,
  getAllBillboardsFromStore,
  getSingleBillboard,
  updateBillboard
} from '../controllers/billboard.controller'

const router = Router()

router.route('/store/:storeId').get(getAllBillboardsFromStore).post(clerkMiddleware(), authenticate, createBillboard)
router
  .route('/store/:storeId/:billboardId')
  .patch(clerkMiddleware(), authenticate, updateBillboard)
  .delete(clerkMiddleware(), authenticate, deleteBillboard)
router.route('/:billboardId').get(getSingleBillboard)

export default router
