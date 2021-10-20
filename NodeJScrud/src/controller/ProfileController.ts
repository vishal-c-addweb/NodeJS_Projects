import {  Response } from "express";
import {  validationResult } from "express-validator/check";
import Request from "../types/Request";
import User, { IUser } from "../models/User";
import Profile, { IProfile } from "../models/Profile";
import { success,error,dataArray } from "../response_builder/responsefunction";
import responsecode  from "../response_builder/responsecode";
import { findOneIdQuery,findOneAndRemoveUserQuery } from "../services/userService";
import { findQuery,findOneUserQuery,findOneAndRemoveQuery,findByIdAndUpdateOrCreate } from "../services/profileService";

const { Validator } = require('node-input-validator');

const ProfileController = {

     /**
     * Get All User Profile
     * @param req
     * @param res
     * @returns {*}
     */
    index: async function index(req: Request, res: Response) {
        try {
          
          const profiles = await findQuery().populate("user", ["avatar", "email"]);
          
          if (profiles.length > 0) {
            const count = await Profile.countDocuments(profiles);
            let meta :object ={ message:"User Profile", status:"success",records: count };
            res.status(responsecode.Success).json(success(meta,profiles));
          } else {
            let meta :object = { message:"No Content", status:"Failed" };
            res.status(responsecode.No_Content).json(error(meta,profiles));
          }
        
        } catch (err) {
        
          console.error(err.message);
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        }
    },

    /**
     * Get Auth User Profile
     * @param req
     * @param res
     * @returns {*}
     */
    me: async function me(req: Request, res: Response) {
        try {
          
          const profile: IProfile = await findOneUserQuery(req.userId).populate("user", ["avatar", "email"]);
      
          if (!profile) {
            let meta :object ={ message:"Bad Request", status:"Failed" };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          }
      
          let meta :object ={ message:"User Profile", status:"success" }
          res.status(responsecode.Success).json(success(meta,profile));
        
        } catch (err) {
        
          console.error(err.message);
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        }
    },
    /**
     * Create a User Profile
     * @param req
     * @param res
     * @returns {*}
     */
    create: async function createProfile(req: Request, res: Response) {
      
        const validate = new Validator(req.body, {
          firstName: 'required',
          lastName: 'required',
          username: 'required'
        });
        
        const matched = await validate.check();

        const { firstName, lastName, username } = req.body;
    
        // Build profile object based on IProfile
        const profileFields = {
          user: req.userId,
          firstName,
          lastName,
          username,
        };
    
        try {
          
          let user: IUser = await findOneIdQuery(req.userId);
              
          if (!matched) {
            let meta :object ={ message:"Bad Request", status:"Failed", errors: validate.errors };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          } else {
            if (!user) {
              let meta :object ={ message:"Bad Request", status:"Failed" };
              res.status(responsecode.Bad_Request).json(error(meta,dataArray));
            }
      
            let profile: IProfile = await findOneUserQuery(req.userId);
            
            if (profile) {
              // Update
              profile = await findByIdAndUpdateOrCreate(req.userId,profileFields);      
              let meta :object ={ message:"User Profile", status:"success" };
              res.status(responsecode.Success).json(success(meta,profile));
            }
      
            // Create
            profile = new Profile(profileFields);
      
            await profile.save();
      
            let meta :object ={ message:"User Created", status:"success" }
            res.status(responsecode.Created).json(success(meta,profile));
          }
        } catch (err) {
        
          console.error(err.message);
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        }
    },

    /**
     * find a User Profile by id
     * @param req
     * @param res
     * @returns {*}
     */
    find: async function findProfile(req: Request, res: Response) {
        try {
          const userId = req.params.userId;
          const profile: IProfile = await findOneUserQuery(userId).populate("user", ["avatar", "email"]);
      
          if (!profile) {
            let meta :object ={ message:"Bad Request", status:"Failed" };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          }
          
          let meta :object ={ message:"User Profile", status:"success" }
          res.status(responsecode.Success).json(success(meta,profile));
        
        } catch (err) {
          console.error(err.message);
          
          if (err.kind === "ObjectId") {
            let meta :object ={ message:"Bad Request", status:"Failed" };
            res.status(responsecode.Bad_Request).json(error(meta,dataArray));
          }
          
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        }
    },

    /**
     * delete User Profile by id
     * @param req
     * @param res
     * @returns {*}
     */
    delete: async function deleteProfile(req: Request, res: Response) {
        try {
        
          // Remove profile
          let profile = await findOneAndRemoveQuery(req.userId);
          if (profile) {
              // Remove user
            await findOneAndRemoveUserQuery(req.userId);
      
            let meta :object ={ message:"User Removed", status:"Success" };
            res.status(responsecode.Success).json(error(meta,dataArray));
          } else {
            let meta :object ={ message:"User & profile not found", status:"Failed" };
            res.status(responsecode.Not_Found).json(error(meta,dataArray));
          }
        
        } catch (err) {
        
          console.error(err.message);
          let meta :object ={ message:"Server error", status:"Failed" };
          res.status(responsecode.Internal_Server_Error).json(error(meta,dataArray));
        
        }
    }
};

export default ProfileController;