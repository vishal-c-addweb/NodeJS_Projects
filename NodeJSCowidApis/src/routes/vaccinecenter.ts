import { Router } from "express";
import vaccineCenterApiController from "../controller/vaccineCenterApiController";
const vaccineCenterValidation = require('../validation/vaccineCenterValidation');
const router: Router = Router();

// @route   POST user/addvaccinecenter
// @desc    Give JWT token & required fields, add member in members field.
// @access  Private
router.post("/addvaccinecenter", vaccineCenterValidation.validationBodyRulesForAddCenter, vaccineCenterApiController.addvaccinecenter);

router.post("/updatevaccinecenter", vaccineCenterApiController.updatevaccinecenter);

router.post("/center/pincode", vaccineCenterValidation.validationBodyRulesForGetCenterByPincode, vaccineCenterApiController.getcenterbypincode);

router.post("/center/city&state", vaccineCenterValidation.validationBodyRulesForGetCenterByCityState,vaccineCenterApiController.getcenterbycitystate);

router.post("/center/filter",vaccineCenterApiController.filterCener);

export default router;