import { Router } from "express";
import userController from "../controllers/userApiController";
import authenticate from "../middleware/authenticate";
const router: Router = Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.put('/:id', authenticate, userController.update);

router.delete('/:id', authenticate, userController.deleteUser);

router.get('/stats', authenticate, userController.getUserStats);

router.get('/:id', userController.getUser);

router.get('/', userController.getAllUser);

router.post('/forgotPassword', authenticate, userController.forgotPassword);

export default router;