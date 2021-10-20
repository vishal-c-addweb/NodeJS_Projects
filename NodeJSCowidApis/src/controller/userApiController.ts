import bcrypt from "bcrypt";
import { Response } from "express";
import Request from "../types/Request";
import User, { IUser } from "../model/User";
import { dataArray, successErrorResponse } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as userApiService from "../service/userApiService";
import { IResult } from "../model/User";
const { validationResult } = require('express-validator');

const userApiController = {
    /**
     * Request a mobile & password from User and login or register the user and return jwt token.
     * @param req
     * @param res
     * @returns {*}
     */
    loginRegister: async function loginRegister(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            successErrorResponse(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: IResult = await userApiService.userService(req);
                let meta: object = { message: result.message, status: result.status};
                successErrorResponse(meta, result.data, result.responsecode, res);
            } catch (err) {
                console.error(err.message);
                let meta: object = { message: "Server error", status: "Failed" };
                successErrorResponse(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    },

    /**
     * Request a jwt token from User and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    userData: async function userData(req: Request, res: Response) {
        try {
            let user: IUser = await User.findById(req.userId).select("-password");
            let meta: object = { message: "User Data", status: "success" };
            successErrorResponse(meta, user, responsecode.Success, res);
        } catch (err) {
            console.error(err.message);
            let meta: object = { message: "Server error", status: "Failed" };
            successErrorResponse(meta, dataArray, responsecode.Internal_Server_Error, res);
        }
    }
};

export default userApiController;
