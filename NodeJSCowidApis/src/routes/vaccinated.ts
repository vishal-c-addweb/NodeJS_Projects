import { Router } from "express";
import vaccinatedApiController from "../controller/vaccinatedApiController";
import authenticate from "../middleware/authenticate";
const vaccinatedValidation = require('../validation/vaccinatedValidation');
const router: Router = Router();

// @route   POST user
// @desc    Give JWT token & required fields, done vaccine.
// @access  Private
router.post("/vaccinated", authenticate, vaccinatedValidation.validationBodyRules, vaccinatedApiController.vaccinated);

export default router;