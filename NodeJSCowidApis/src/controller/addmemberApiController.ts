import { Response } from "express";
import Request from "../types/Request";
import { dataArray, successErrorResponse } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as addmemberService from "../service/addmemberService";
import { IResult } from "../model/User";
const { validationResult } = require('express-validator');

const addmemberApiController = {
    /**
     * Request a data from user and register member and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    addMember: async function addMember(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors:  errors.array() };
            successErrorResponse(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: IResult = await addmemberService.addMemberService(req);
                let meta: object = { message: result.message, status: result.status };
                successErrorResponse(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                successErrorResponse(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    },

    deleteMember: async function deleteMember(req: Request, res: Response) {
        try {
            let result: IResult = await addmemberService.deleteMemberService(req);
            let meta: object = { message: result.message, status: result.status };
            successErrorResponse(meta, result.data, result.responsecode, res);
        } catch (err) {
            let meta: object = { message: "Server error", status: "Failed" };
            successErrorResponse(meta, dataArray, responsecode.Internal_Server_Error, res);
        } 
    }
};

export default addmemberApiController;