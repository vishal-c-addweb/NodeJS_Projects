import { Router } from "express";
import checkauth from "../../middleware/checkauth";
import StudentController from "../../controller/StudentController";

const router: Router = Router();

//get All students
router.get("/",checkauth,StudentController.index);

//Create Student
router.post("/",checkauth,StudentController.create);

    //update employee
router.put("/:id",checkauth,StudentController.update);


// @route   GET api/employee/id
// @desc    Get employee by id
// @access  Private
router.get("/:id", checkauth , StudentController.find);

// @route   DELETE api/employee/:id
// @desc    Delete employee
// @access  Private
router.delete("/:id",checkauth, StudentController.delete);

//search text
router.get("/search/:text", checkauth , StudentController.search);

//search with pagination
router.get("/search/:text/:page/:limit", checkauth , StudentController.searchWithPagination);

//pagination
router.get('/:page/:limit',checkauth,StudentController.pagination);

export default router;