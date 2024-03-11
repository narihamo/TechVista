import { Router } from "express";
import deviceController from "../controllers/deviceController.js";

const router = new Router()

router.post('/', deviceController.create)
router.post('/rate', deviceController.rate)
router.get('/', deviceController.getAll)
router.get('/get-user-rate', deviceController.getUserRate)
router.get('/:id', deviceController.getOne)

export default router