import { Router } from 'express'
import storeRouter from './store.routes'
import billboardRouter from './billboard.routes'
import categoryRouter from './category.routes'
import sizeRouter from './size.routes'

const router = Router()

router.use('/stores', storeRouter)
router.use('/billboards', billboardRouter)
router.use('/categories', categoryRouter)
router.use('/sizes', sizeRouter)

export default router
