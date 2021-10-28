import { Router } from "express";
import orderController from "../controllers/orderApiController";
import authenticate from "../middleware/authenticate";
const router: Router = Router();

router.post('/', authenticate, orderController.addOrder);

router.put('/:id', authenticate, orderController.updateOrder);

router.delete('/:id', authenticate, orderController.deleteOrder);

router.get('/:userId', authenticate, orderController.getOrder);

router.get('/', authenticate, orderController.getAllOrder);

router.get('/income', authenticate, orderController.getMonthlyIncome);

export default router;