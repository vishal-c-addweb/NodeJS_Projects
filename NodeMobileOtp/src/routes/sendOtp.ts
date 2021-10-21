import { Router } from "express";
import sendOtpController from "../controller/sendOtpController";
const router: Router = Router();

// @route   POST sendotp
// @desc    Give Mobile number, returns the otp.
// @access  Private with springedge api-key
router.post("/sendotp",sendOtpController.sendOtp);

// @route   POST verify
// @desc    verify otp and return proper message.
// @access  Public
router.post("/verify",sendOtpController.verify);

export default router;