import { Response } from "express";
import Request from "../types/Request";
import User, { IResult, IUser } from "../model/User";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as vaccinatedApiService from "../service/vaccinatedApiService";
const { validationResult } = require('express-validator');

const vaccinatedApiController = {
    /**
     * Request a secret code and dose from user and done vaccinated and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    vaccinated: async function vaccinated(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: IResult = await vaccinatedApiService.vaccinatedApiService(req);
                let meta: object = { message: result.message, status: result.status };
                responseFunction(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    }
};

export default vaccinatedApiController;