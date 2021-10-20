import { Router} from "express";
import checkauth from "../../middleware/checkauth";
import EmployeeController from "../../controller/EmployeeController";

const path = require("path");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (req: Request,file: any,cb: any) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
  storage: storage,
});

const router: Router = Router();

//get all employees
router.get( "/", checkauth,EmployeeController.index);

//Create employees
router.post("/", checkauth,EmployeeController.create);

//update employee
router.put("/:id",checkauth,EmployeeController.update);


// @route   GET api/employee/id
// @desc    Get employee by id
// @access  Private
router.get("/:id", checkauth , EmployeeController.find);

// @route   DELETE api/employee/:id
// @desc    Delete employee
// @access  Private
router.delete("/:id",checkauth, EmployeeController.delete);


// @route   Search api/employee/?name=
// @desc    Search name
// @access  Private
router.get("/search/:name", checkauth , EmployeeController.search);

//upload and image 
router.post("/upload" , checkauth, upload.single('profile') ,EmployeeController.upload);

//pagination
router.get('/pagination/:page/:limit',checkauth,EmployeeController.pagination);


export default router;