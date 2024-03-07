import { Router } from "express";
import deviceController from "../controllers/deviceController.js";

const router = new Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

export default router