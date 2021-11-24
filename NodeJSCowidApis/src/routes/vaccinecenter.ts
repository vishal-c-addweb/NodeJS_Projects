import { Router } from "express";
import vaccineCenterApiController from "../controller/vaccineCenterApiController";
const vaccineCenterValidation = require('../validation/vaccineCenterValidation');
const router: Router = Router();

router.post("/addvaccinecenter", vaccineCenterValidation.validationBodyRulesForAddCenter, vaccineCenterApiController.addvaccinecenter);

router.post("/updatevaccinecenter",vaccineCenterValidation.validationBodyRulesForUpdateCenter, vaccineCenterApiController.updatevaccinecenter);

router.post("/center/pincode", vaccineCenterValidation.validationBodyRulesForGetCenterByPincode, vaccineCenterApiController.getcenterbypincode);

router.post("/center/city&state", vaccineCenterValidation.validationBodyRulesForGetCenterByCityState,vaccineCenterApiController.getcenterbycitystate);

export default router;