import { Router } from "express";
import cartController from "../controllers/cartApiController";
import authenticate from "../middleware/authenticate";
const router: Router = Router();

router.post('/', authenticate, cartController.addToCart);

router.put('/:id', authenticate, cartController.updateCart);

router.delete('/:id', authenticate, cartController.deleteCart);

router.get('/:userId', authenticate, cartController.getCart);

router.get('/', authenticate, cartController.getAllCart);

export default router;