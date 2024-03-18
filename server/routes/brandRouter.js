import { Router } from "express";
import brandController from "../controllers/brandController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";

const router = new Router()

router.get('/', brandController.getAll)
router.post('/', checkRole('ADMIN'), brandController.create)

export default router