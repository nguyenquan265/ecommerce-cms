import { Router } from 'express'
import storeRouter from './store.routes'
import billboardRouter from './billboard.routes'
import categoryRouter from './category.routes'
import sizeRouter from './size.routes'
import colorRouter from './color.routes'
import productRouter from './product.routes'
import orderRouter from './order.routes'

const router = Router()

router.use('/stores', storeRouter)
router.use('/billboards', billboardRouter)
router.use('/categories', categoryRouter)
router.use('/sizes', sizeRouter)
router.use('/colors', colorRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

export default router
