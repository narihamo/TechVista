import { Router } from "express";
import basketController from "../controllers/basketController.js";

const router = new Router()

router.post('/', basketController.addToBasket)
router.get('/:userId', basketController.getAll)
router.delete('/', basketController.removeFromBasket)

export default router