import bcrypt from "bcryptjs"
import config from "config";
import {  Response } from "express";
import jwt from "jsonwebtoken";
import Payload from "../types/Payload"
import Request from "../types/Request";
import User, { IUser } from "../models/User";
import { success,error,dataArray } from "../response_builder/responsefunction";
import responsecode  from "../response_builder/responsecode";
import {findByIdQuery,findOneQuery} from "../services/userService";
const { Validator } = require('node-input-validator');

const AuthController = {

    /**
     * Request a data from User
     * @param req
     * @param res
     * @returns {*}
     */
    index: async function index(req: Request, res: Response) {
  
        try {
          const user: IUser = await findByIdQuery(req.userId).select("-password");
          let meta :object = { message:"User Data", status:"success" };
          res.status(responsecode.Success).json(success(meta,user));
      
        } catch (err) {
          console.error(err.message);
          let meta :object = { message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
      
        }
    },

    /**
     * Login & get JWT token
     * @param req
     * @param res
     * @returns {*}
     */
    login: async function login(req: Request, res: Response) {
      
        const validate: any = new Validator(req.body, {
            email: 'required|email',
            password:'required'
        });

        const matched: string = await validate.check();
    
        const { email, password } : any = req.body;
        
        // Build employee object based on IEmployee
        const userFields: object = {
          email,
          password
        };

        try {
    
          if (!matched) {
            let meta :object ={ message:"Bad Request", status:"Failed", errors: validate.errors };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          } else {
            let user: IUser = await findOneQuery(email);
            
            if (!user) {
              let meta :object ={ message:"User not Exist", status:"Failed" };
              res.status(responsecode.Not_Found).json(error(meta,dataArray));
            } else {
              const isMatch = await bcrypt.compare(password, user.password);
      
              if (!isMatch) {
                let meta :object ={ message:"Invalid Credential", status:"Failed" };
                res.status(responsecode.Unauthorized).json(error(meta,dataArray));
              }
        
              else {
                
                const payload: Payload = {
                  userId: user.id
                };
          
                jwt.sign(
                  payload,
                  config.get("jwtSecret"),
                  { expiresIn: config.get("jwtExpiration") },
                  (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                  }
                );
              }
            }
            
          } 
        } catch (err) {
    
          console.error(err.message);
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray)); 
        }
    }
};

export default AuthController;