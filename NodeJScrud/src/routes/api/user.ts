import { Router } from "express";
import UserController from "../../controller/UserController";
import auth from "../../middleware/auth";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post("/",UserController.register);

export default router;
