import { Router } from "express";
import auth from "../../middleware/auth";
import AuthController from "../../controller/AuthController";

const router: Router = Router();

// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
router.get("/", auth, AuthController.index);

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post("/",AuthController.login);


export default router;
