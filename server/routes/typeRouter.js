import { Router } from "express";
import checkRole from "../middlewares/checkRoleMiddleware.js";
import typeController from '../controllers/typeController.js'

const router = new Router()

router.post('/', checkRole('ADMIN'), typeController.create)
// router.post('/', typeController.create)
router.get('/', typeController.getAll)

export default router