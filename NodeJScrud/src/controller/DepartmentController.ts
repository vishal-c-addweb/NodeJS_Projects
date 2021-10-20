import { Response } from "express";
import Request from "../types/Request";
import Department, { IDepartment } from "../models/Department";
import { success,error,dataArray } from "../response_builder/responsefunction";
import responsecode  from "../response_builder/responsecode";
import {findQuery,findOneQuery} from "../services/departmentService";

const { Validator } = require('node-input-validator');

const DepartmentController = {

    /**
     * Request a data from department
     * @param req
     * @param res
     * @returns {*}
     */
    index: async function index(req: Request, res: Response) {
        try {
            const departments: any = await findQuery();
            if (departments.length > 0) {
                const count: number = await Department.countDocuments(departments);
                let meta :object = { message:"Departments Data", status:"success", records:count };
                res.status(responsecode.Success).json(success(meta,departments));
            } else {
                let meta :object = { message:"No Content", status:"Failed" };
                res.status(responsecode.No_Content).json(error(meta,departments));
            }
        } catch (err) {
            let meta :object = { message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    },

    /**
     * Create a new department
     * @param req
     * @param res
     * @returns {*}
     */
    create: async function createDepartment(req: Request, res: Response) {
        
        const validate: any = new Validator(req.body, {
             departmentName: 'required|minLength:5'
        });
        
        const matched: string = await validate.check();

        const { departmentName }: any = req.body;

        // Build employee object based on IEmployee
        const departmentFields: object = {
            departmentName
          };

        try {
            if (!matched) {
                let meta :object = { message:"Bad Request error", status:"Failed",errors: validate.errors};
                res.status(responsecode.Bad_Request).json(error(meta,dataArray));
            } else {
                let department : IDepartment = await findOneQuery(departmentName);
                
                if (department) {
                    let meta :object = { message:"Bad Request department is already exists", status:"Failed" };
                    res.status(responsecode.Bad_Request).json(error(meta,dataArray));
                }
                else {
                    // Create
                    department = new Department(departmentFields);
            
                    await department.save();
                    
                    let meta :object = { message:"Department Created", status:"Success" };
                    res.status(responsecode.Created).json(success(meta,department));
                }
            }
        } catch (err) {
            let meta :object = { message:"Server error", status:"Failed" };
            res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    }
};

export default DepartmentController;