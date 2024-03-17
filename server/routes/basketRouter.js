import { Router } from "express";
import basketController from "../controllers/basketController.js";

const router = new Router()

router.post('/', basketController.addToBasket)
router.get('/:userId', basketController.getAllBasket)
router.post('/remove', basketController.removeFromBasket)
router.post('/inc', basketController.countIncrement)
router.post('/dec', basketController.countDecrement)

export default router