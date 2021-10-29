import { Router } from "express";
import stripeController from "../controllers/stripeApiController";
import authenticate from "../middleware/authenticate";
const router: Router = Router();

router.post('/payment', authenticate, stripeController.payment);

export default router;