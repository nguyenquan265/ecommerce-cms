import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import {
  createCategory,
  deleteCategory,
  getAllCategoriesFromStore,
  getSingleCategory,
  updateCategory
} from '../controllers/category.controller'

const router = Router()

router.route('/store/:storeId').get(getAllCategoriesFromStore).post(clerkMiddleware(), authenticate, createCategory)
router
  .route('/store/:storeId/:categoryId')
  .patch(clerkMiddleware(), authenticate, updateCategory)
  .delete(clerkMiddleware(), authenticate, deleteCategory)
router.route('/:categoryId').get(getSingleCategory)

export default router
