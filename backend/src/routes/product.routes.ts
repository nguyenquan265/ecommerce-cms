import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import {
  createProduct,
  deleteProduct,
  getAllProductsFromStore,
  getSingleProduct,
  updateProduct
} from '../controllers/product.controller'

const router = Router()

router.route('/store/:storeId').get(getAllProductsFromStore).post(clerkMiddleware(), authenticate, createProduct)
router
  .route('/store/:storeId/:productId')
  .patch(clerkMiddleware(), authenticate, updateProduct)
  .delete(clerkMiddleware(), authenticate, deleteProduct)
router.route('/:productId').get(getSingleProduct)

export default router
