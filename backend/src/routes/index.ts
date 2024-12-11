import { Router } from 'express'
import storeRouter from './store.routes'
import billboardRouter from './billboard.routes'

const router = Router()

router.use('/stores', storeRouter)
router.use('/billboards', billboardRouter)

export default router
