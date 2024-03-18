import { Router } from "express";
import deviceController from "../controllers/deviceController.js";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware.js";

const router = new Router()

router.post('/create', checkRoleMiddleware('ADMIN'), deviceController.create)
router.post('/rate', deviceController.rate)
router.get('/', deviceController.getAll)
router.get('/get-user-rate', deviceController.getUserRate)
router.get('/:id', deviceController.getOne)

export default router