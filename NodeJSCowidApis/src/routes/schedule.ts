import { Router } from "express";
import scheduleApiController from "../controller/scheduleApiController";
import authenticate from "../middleware/authenticate";
const sheduleValidation = require('../validation/scheduleValidation');
const router: Router = Router();

// @route   POST user
// @desc    Give JWT token & required fields, schedule vaccine as per request.
// @access  Private
router.post("/schedule", authenticate, sheduleValidation.validationBodyRules, scheduleApiController.schedule);

export default router;