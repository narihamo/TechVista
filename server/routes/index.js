import { Router } from "express"
import userRouter from './userRouter.js'
import brandRouter from './brandRouter.js'
import deviceRouter from './deviceRouter.js'
import typeRouter from './typeRouter.js'
import basketRouter from './basketRouter.js'


const router = new Router()

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/basket', basketRouter)

export default router