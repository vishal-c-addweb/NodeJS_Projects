import bcrypt from "bcrypt";
import { Response } from "express";
import Request from "../types/Request";
import { IUser } from "../model/User";
import { dataArray, responseFunctions } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as userApiService from "../service/userApiService";
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
            responseFunctions(meta, dataArray, responsecode.Bad_Request);
        } else {
            try {
                let user: IUser = await userApiService.getUser(req.body.mobile);
                if (user) {
                    const isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
                    if (isMatch) {
                        const token: string = userApiService.createToken(user._id);
                        let meta: object = { message: "Logged in Successfully", status: "success" };
                        responseFunctions(meta, { token }, responsecode.Success);
                    } else {
                        let meta: object = { message: "Invalid Credential", status: "success" };
                        responseFunctions(meta, dataArray, responsecode.Unauthorized);
                    }
                } else {
                    const token: string = await userApiService.createUser(req.body.mobile,req.body.password);
                    let meta: object = { message: "Registered in Successfully", status: "success" };
                    responseFunctions(meta, {token}, responsecode.Created);
                }
            } catch (err) {
                console.error(err.message);
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunctions(meta, dataArray, responsecode.Internal_Server_Error);
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
            let user: IUser = await userApiService.getUserById(req.userId);
            let meta: object = { message: "User Data", status: "success" };
            responseFunctions(meta, user, responsecode.Success);
        } catch (err) {
            console.error(err.message);
            let meta: object = { message: "Server error", status: "Failed" };
            responseFunctions(meta, dataArray, responsecode.Internal_Server_Error);
        }
    }
};

export default userApiController;
