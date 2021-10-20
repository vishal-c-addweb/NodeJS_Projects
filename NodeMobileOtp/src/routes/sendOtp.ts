import { Router } from "express";
import sendOtpController from "../controller/sendOtpController";
const router: Router = Router();

// @route   POST user
// @desc    Give Mobile number, returns the token upon successful registration or login.
// @access  Public
router.post("/sendotp",sendOtpController.loginRegister);

// @route   GET user
// @access  Private
router.get("/sendotp", sendOtpController.userData);

// @route   POST user
// @desc    Give Mobile number, returns the token upon successful registration or login.
// @access  Public
router.post("/verify",sendOtpController.verify);
export default router;