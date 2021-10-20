import { Response } from "express";  
import Request from "../types/Request";
import Student, { IStudent } from "../models/Student";
import { success,error,dataArray } from "../response_builder/responsefunction";
import responsecode  from "../response_builder/responsecode";
import { findQuery,findOneQuery,findOneIdQuery,findByIdAndUpdateQuery,findInQuery,findOneAndRemoveQuery,searchQuery,paginationQuery,searchAndPaginationQuery } from "../services/studentService";

const { Validator } = require('node-input-validator');

const StudentController = {

    /**
     * Request a data from student
     * @param req
     * @param res
     * @returns {*}
     */
    index: async function index(req: Request, res: Response) {
        try {
            const students = await findQuery();
            
            if (students.length > 0) {
                const count = await Student.countDocuments(students);
                let meta :object = { message:"Student Data", status:"Success"};
                res.status(responsecode.Success).json(success(meta,students));
              } else {
                let meta :object = { message:"No Content", status:"Failed" };
                res.status(responsecode.No_Content).json(error(meta,students));
              }
        } catch(err) {
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },


    /**
     * Create a new student
     * @param req
     * @param res
     * @returns {*}
     */
    create: async function createStudent(req: Request, res: Response) {
        
        const validate = new Validator(req.body, {
            rollNo: 'required|integer',
            name: 'required|minLength:5',
            school: 'required',
            subject: 'required|object',
            image: 'required'
          });
          
        const matched = await validate.check();

        const { rollNo, name, school, subject, image } = req.body;
        
        // Build student object based on IStudent
        const studentFields = {
            rollNo,
            name,
            school,
            subject,
            image,
        };

  
        try {
            let student: IStudent = await findOneQuery(rollNo);
            
            if (!matched) {
                let meta :object ={ message:"Bad Request", status:"Failed", errors: validate.errors };
                res.status(responsecode.Bad_Request).json(error(meta,dataArray));
            } else {
                if (student) {
                    let meta :object ={ message:"Bad Request Student is already exists", status:"Failed" };
                    res.status(responsecode.Bad_Request).json(error(meta,dataArray));
                }
                else {
                    // Create
                    student = new Student(studentFields);
                    await student.save();
                    let meta :object ={ message:"Student Created", status:"success" };
                    res.status(responsecode.Created).json(success(meta,student));  
                }
            }
        } catch (err) {
            console.error(err.message);
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },

        /**
     * Update a student by id
     * @param req
     * @param res
     * @returns {*}
     */
    update: async function updateStudent(req: Request, res: Response) {

        const validate = new Validator(req.body, {
            rollNo: 'required|integer',
            name: 'required|minLength:5',
            school: 'required',
            subject: 'required|object',
            image: 'required'
          });
          
        const matched = await validate.check();

        const { rollNo, name, school, subject, image } = req.body;

        // Build profile object based on IProfile
        const studentFields = {
            rollNo, 
            name,
            school, 
            subject, 
            image
        };

        try {
            if (!matched) {
                let meta: object = { message:"Bad Request", status:"Failed", errors: validate.errors };
                res.status(responsecode.Bad_Request).json(error(meta,dataArray));
            }
            else {
                const id = req.params.id;
                await findByIdAndUpdateQuery(id,studentFields);
                const student = await findOneIdQuery(id);
                let meta :object = { message:"Student Updated", status:"success" };
                res.status(responsecode.Success).json(success(meta,student));
            } 
        } catch (err) {
            console.error(err.message);
            if (err.kind == "ObjectId") {
                let meta :object = { message:"Student id not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            let meta :object = { message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },
    
    /**
     * find a student by id
     * @param req
     * @param res
     * @returns {*}
     */
    find: async function findStudent(req: Request, res: Response) {
        try {
            const ids = req.params.id.split(",");
        
            let student = await findInQuery(ids);

            if (!student) {
                let meta :object ={ message:"Student not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            else {
                let meta :object = { message:"Student Data", status:"Success" };
                res.status(responsecode.Success).json(success(meta,student));
            }     
    
        } catch (err) {
            console.error(err.message);
            if (err.kind == "ObjectId") {
                let meta :object ={ message:"student not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },
    
    /**
     * delete a student by id
     * @param req
     * @param res
     * @returns {*}
     */
     delete: async function deleteStudent(req: Request, res: Response) {
        try {
            // Remove employee
            let id = req.params.id;

            let student = await findOneAndRemoveQuery(id);
            
            if (student) {
                let meta :object = { message:"Student Deleted", status:"Success" };
                res.status(responsecode.Success).json(error(meta,dataArray));
            } else {
                let meta :object = { message:"Student not found with this Id", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
        } catch (err) {
            console.error(err.message);
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        }
    },

    /**
     * search student by name
     * @param req
     * @param res
     * @returns {*}
     */
    search: async function searchStudent(req: Request, res: Response) {
        try {
            const text = req.params.text;
            const student = await searchQuery(text);
      
            if (!student) {
                let meta :object ={ message:"Student not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
      
            let meta :object ={ message:"Student Data", status:"Success" };
            res.status(responsecode.Success).json(success(meta,student));
      
        } catch (err) {
            console.error(err.message);
            if (err.kind == "ObjectId") {
                let meta :object = { message:"Student not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },

    /**
     * paginate results
     * @param req
     * @param res
     * @returns {*}
     */
    pagination: async function pagination(req: Request, res: Response) {
        try {
            const page = parseInt(req.params.page);
            const limit = parseInt(req.params.limit);
            const skipIndex = (page - 1) * limit;
            const result = await paginationQuery(skipIndex,limit).sort({rollNo:1});
            const count = await Student.countDocuments(result);
            const length =  result.length;
            let meta :object ={ message:"Student Data", status:"Success",page:page,records:count,pagesize:length};
            res.status(responsecode.Success).json(success(meta,result));
        } catch (err) {
          console.error(err.message);
          if (err.kind == "ObjectId") {
              let meta :object = { message:"Student not found", status:"Failed" };
              res.status(responsecode.Not_Found).json(error(meta,dataArray));
          }
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },

    /**
     * search student & paginate student
     * @param req
     * @param res
     * @returns {*}
     */
    searchWithPagination: async function searchWithPagination(req: Request, res: Response) {
        try {
            const page = parseInt(req.params.page);
            const limit = parseInt(req.params.limit);
            const skipIndex = (page - 1) * limit;
            const text = req.params.text;
            const student = await searchAndPaginationQuery(text,skipIndex,limit).sort({rollNo:1});
            const count = await Student.countDocuments(student); 
            if (!student) {
                let meta :object ={ message:"Student not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
      
            let meta :object ={ message:"Student Data", status:"Success",page:page,records:count,pagesize:student.length};
            res.status(responsecode.Success).json(success(meta,student));
      
        } catch (err) {
            console.error(err.message);
            if (err.kind == "ObjectId") {
                let meta :object = { message:"Student not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    }
};

export default StudentController;