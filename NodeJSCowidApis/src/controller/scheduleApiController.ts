import { Response } from "express";
import Request from "../types/Request";
import { IResult } from "../model/User";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as scheduleApiService from "../service/scheduleApiService";
const { validationResult } = require('express-validator');

const scheduleApiController = {
    /**
     * Request a data from user and schedule member vaccine and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    schedule: async function schedule(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors:  errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: IResult = await scheduleApiService.scheduleDoseService(req);
                let meta: object = { message: result.message, status: result.status};
                responseFunction(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    }
};

export default scheduleApiController;