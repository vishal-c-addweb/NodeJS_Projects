import { Router } from "express";
import productController from "../controllers/productApiController";
import authenticate from "../middleware/authenticate";
const router: Router = Router();

router.post('/', authenticate, productController.addProduct);

router.put('/:id', authenticate, productController.updateProduct);

router.delete('/:id', authenticate, productController.deleteProduct);

router.get('/:id', productController.getProduct);

router.get('/', productController.getAllProduct);

export default router;