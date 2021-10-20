import bcrypt from "bcryptjs"
import config from "config";
import {  Response } from "express";
import {  validationResult } from "express-validator/check";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Payload from "../types/Payload";
import Request from "../types/Request";
import User, { IUser } from "../models/User";
import { error,dataArray } from "../response_builder/responsefunction";
import responsecode  from "../response_builder/responsecode";
import { findOneQuery } from "../services/userService";

const { Validator } = require('node-input-validator');

const UserController = {

    /**
     * Request a data from User
     * @param req
     * @param res
     * @returns {*}
     */
    register: async function register(req: Request, res: Response) {

        const validate = new Validator(req.body, {
            email: 'required|email',
            password: 'required'
        });

        const matched = await validate.check();
    
        const { email, password } = req.body;
        try {
          let user: IUser = await findOneQuery(email);
    
          if (!matched) {
            let meta :object ={ message:"Bad Request", status:"Failed", errors: validate.errors };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          } else {
            if (user) {
              let meta :object ={ message:"Bad Request User already exists", status:"Failed" };
              res.status(responsecode.Bad_Request).json(error(meta,dataArray));
            } else {
              const options: gravatar.Options = {
                s: "200",
                r: "pg",
                d: "mm"
              };
        
              const avatar = gravatar.url(email, options);
        
              const salt = await bcrypt.genSalt(10);
              const hashed = await bcrypt.hash(password, salt);
        
              // Build user object based on IUser
              const userFields = {
                email,
                password: hashed,
                avatar
              };
        
              user = new User(userFields);
        
              await user.save();
        
              const payload: Payload = {
                userId: user.id
              };
        
              jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: config.get("jwtExpiration") },
                (err, token) => {
                  if (err) throw err;
                  res.status(responsecode.Success).json({ token });
                }
              );
            }            
          }
        } catch (err) {
          console.error(err.message);
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        }
    }
};

export default UserController;