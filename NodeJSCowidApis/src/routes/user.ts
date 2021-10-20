import { Router } from "express";
import userApiController from "../controller/userApiController";
import authenticate from "../middleware/authenticate";
const userValidation = require("../validation/userValidation");
const router: Router = Router();

// @route   POST user
// @desc    Give Mobile number, returns the token upon successful registration or login.
// @access  Public
router.post("/user", userValidation.validationBodyRules, userApiController.loginRegister);

// @route   GET user
// @desc    Give JWT token, returns the user data.
// @access  Private
router.get("/user", authenticate, userApiController.userData);

export default router;