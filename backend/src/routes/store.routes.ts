import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import { createStore } from '../controllers/store.controller'

const router = Router()

router.route('/').post(clerkMiddleware(), authenticate, createStore)

export default router
