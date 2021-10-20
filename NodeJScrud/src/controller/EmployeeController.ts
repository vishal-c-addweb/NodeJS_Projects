import { Response } from "express";
import Request from "../types/Request";
import Employee, { IEmployee } from "../models/Employee";
import { success,error,dataArray } from "../response_builder/responsefunction";
import responsecode  from "../response_builder/responsecode";
import { findQuery,findOneQuery,findInQuery,findOneAndRemoveQuery,findOneIdQuery,findByIdAndUpdateQuery,searchQuery,paginationQuery } from "../services/employeeService";

const { Validator } = require('node-input-validator');

const EmployeeController = {
  
    /**
     * Request a data from Employee
     * @param req
     * @param res
     * @returns {*}
     */
    index: async function index(req: Request, res: Response) {
        try {
            const employees = await findQuery().populate("employee",["employeeId","name","salary"]);
            if (employees.length > 0) {
              const count = await Employee.countDocuments(employees);
              let meta :object = { message:"Employees Data", status:"success",records: count};
              res.status(responsecode.Success).json(success(meta,employees));
            } else {
              let meta :object = { message:"No Content", status:"Failed" };
              res.status(responsecode.No_Content).json(error(meta,employees));
            }
        } catch (err) {
            let meta :object = { message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },

    /**
     * Create a new Employee
     * @param req
     * @param res
     * @returns {*}
     */
    create: async function createEmployee(req: Request, res: Response) {
     
        const validate = new Validator(req.body, {
          employeeId: 'required|integer',
          name: 'required|minLength:5',
          salary: 'required|integer'
        })
        
        const matched = await validate.check();

        const { employeeId, name, salary } = req.body;
    
        // Build profile object based on IProfile
        const employeeFields = {
          employeeId,
          name,
          salary,
        };
    
        try {
          
          let employee: IEmployee = await findOneQuery(employeeId);
          
          if (!matched) {
            let meta :object = { message:"Bad Request", status:"Failed", errors: validate.errors };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          }
          else {  
            if (employee) {
              let meta :object = { message:"Bad Request employee is already exists", status:"Failed" };
              res.status(responsecode.Bad_Request).json(error(meta,dataArray));
            }
            else {
                // Create
                employee = new Employee(employeeFields);
                await employee.save();
                let meta :object = { message:"Employee Created", status:"success" };
                res.status(responsecode.Created).json(success(meta,employee));  
            }
          }
        } catch (err) {
            console.error(err.message);
            let meta :object = { message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },
    
    /**
     * Update a Employee by id
     * @param req
     * @param res
     * @returns {*}
     */
    update: async function updateEmployee(req: Request, res: Response) {
          
        const validate = new Validator(req.body, {
          employeeId: 'required|integer',
          name: 'required|minLength:5',
          salary: 'required|integer'
        })
        
        const matched = await validate.check();
    
        const { employeeId, name, salary } = req.body;
    
        //Build profile object based on IProfile
        const employeeFields = {
          employeeId,
          name,
          salary,
        };

        try {
          if (!matched) {
            let meta: object = { message:"Bad Request", status:"Failed", errors: validate.errors };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          }
          else {
              const id = req.params.id;
              await findByIdAndUpdateQuery(id,employeeFields);
              const employee = await findOneIdQuery(id);
              let meta :object = { message:"Employee Updated", status:"success" };
              res.status(responsecode.Success).json(success(meta,employee));
          } 
        } catch (err) {
            console.error(err.message);
            if (err.kind == "ObjectId") {
                let meta :object = { message:"Employee id not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            let meta :object = { message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },

    /**
     * find a Employee by id
     * @param req
     * @param res
     * @returns {*}
     */
    find: async function findEmployee(req: Request, res: Response) {
        try {
            const ids = req.params.id.split(",");

            let employee = await findInQuery(ids);

            if (!employee) {
              let meta :object ={ message:"Employee not found", status:"Failed" };
              res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            else {
              let meta :object = { message:"Employee Data", status:"Success" };
              res.status(responsecode.Success).json(success(meta,employee));
            }     

        } catch (err) {
            console.error(err.message);
            if (err.kind == "ObjectId") {
                let meta :object ={ message:"Employee not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },

    /**
     * delete a Employee by id
     * @param req
     * @param res
     * @returns {*}
     */
    delete: async function deleteEmployee(req: Request, res: Response) {
        try {
          // Remove employee
          let id = req.params.id;
          let employee = await findOneAndRemoveQuery(id);
          
          if (employee) {
            let meta :object = { message:"Employee Deleted", status:"Success" };
            res.status(responsecode.Success).json(error(meta,dataArray));
          } else {
            let meta :object = { message:"Employee not found with this Id", status:"Failed" };
            res.status(responsecode.Not_Found).json(error(meta,dataArray));
          }
        } catch (err) {
          console.error(err.message);
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        }
    },

    /**
     * find a Employee by name
     * @param req
     * @param res
     * @returns {*}
     */
    search: async function searchEmployee(req: Request, res: Response) {
        try {
            const regex = new RegExp(req.params.name,'i');
            const searchName = req.params.name;

            const employee = await searchQuery(searchName);
    
            if (!employee) {
                let meta :object ={ message:"Employee not found with this Name", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            else {
              let meta :object ={ message:"Employee Data", status:"Success" };
              res.status(responsecode.Success).json(success(meta,employee));
            }
            
        } catch (err) {
            console.error(err.message);
            if (err.kind == "ObjectId") {
                let meta :object = { message:"Employee not found", status:"Failed" };
                res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
            let meta :object ={ message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
      },

    /**
     * upload image
     * @param req
     * @param res
     * @returns {*}
     */
    upload: async function upload(req: Request, res: Response) {
        try {
          
            let meta :object = {  success: 1,profile_url: `http://localhost:5000/nodeJs/uploads/images/${req.file.filename}` };
            res.json(error(meta,dataArray));
        
          } catch (err) {
        
            console.error(err.message);
        
            if (err.kind == "ObjectId") {
              let meta :object = { message:"Image not uploaded", status:"Failed" };
              res.status(responsecode.Not_Found).json(error(meta,dataArray));
            }
        
            let meta :object = { message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        } 
    },

    /**
     * paginate records
     * @param req
     * @param res
     * @returns {*}
     */
    pagination: async function pagination(req: Request, res: Response) {
        try {
            const page = parseInt(req.params.page);
            const limit = parseInt(req.params.limit);
            const skipIndex = (page - 1) * limit;
            const result = await paginationQuery(skipIndex,limit).sort({employeeId:1});
            let meta :object = { message:"Employee Data", status:"Success" };
            res.status(responsecode.Success).json(success(meta,result));
          
        } catch (err) {
          console.error(err.message);
          if (err.kind == "ObjectId") {
              let meta :object = { message:"Employee not found", status:"Failed" };
              res.status(responsecode.Not_Found).json(error(meta,dataArray));
          }
          let meta :object = { message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    }
};

export default EmployeeController;