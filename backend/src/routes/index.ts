import { Router } from 'express'
import storeRouter from './store.routes'
import billboardRouter from './billboard.routes'
import categoryRouter from './category.routes'

const router = Router()

router.use('/stores', storeRouter)
router.use('/billboards', billboardRouter)
router.use('/categories', categoryRouter)

export default router
