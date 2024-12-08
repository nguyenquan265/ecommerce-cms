import { Router } from 'express'
import storeRouter from './store.routes'

const router = Router()

router.use('/stores', storeRouter)

export default router
