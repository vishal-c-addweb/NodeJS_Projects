import { Router } from "express";
import checkauth from "../../middleware/checkauth";
import DepartmentController from "../../controller/DepartmentController";

const router: Router = Router();

router.get("/", checkauth, DepartmentController.index);

//Create Department
router.post ('/' ,checkauth,DepartmentController.create);

export default router;