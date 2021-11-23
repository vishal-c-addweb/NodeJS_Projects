import { Response } from "express";
import Request from "../types/Request";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as vaccineCenterApiService from "../service/vaccineCenterApiService";
import { IResult } from "../model/User";
const { Validator } = require('node-input-validator');
const { validationResult } = require('express-validator');

const vaccineCenterApiController = {

    /**
     * Request a data from user and add new vaccine center.
     * @param req
     * @param res
     * @returns {*}
     */
    addvaccinecenter: async function addvaccinecenter(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: any = await vaccineCenterApiService.addVaccineCenterService(req);
                let meta: object = { message: result.message, status: result.status };
                responseFunction(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    },

    /**
     * Request a data from user and update vaccine center by id.
     * @param req
     * @param res
     * @returns {*}
     */
    updatevaccinecenter: async function updatevaccinecenter(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: any = await vaccineCenterApiService.updateVaccineCenterService(req);
                let meta: object = { message: result.message, status: result.status };
                responseFunction(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    },

    /**
     * Request a data from user and get vaccine center by pincode.
     * @param req
     * @param res
     * @returns {*}
     */
    getcenterbypincode: async function getcenterbypincode(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: any = await vaccineCenterApiService.getVaccineCenterByPincode(req);
                let meta: object = { message: result.message, status: result.status };
                responseFunction(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    },

    /**
     * Request a data from user and get vaccine center by city and state
     * @param res
     * @returns {*}
     */
    getcenterbycitystate: async function getcenterbycitystate(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: any = await vaccineCenterApiService.getVaccineCenterByCityState(req);
                let meta: object = { message: result.message, status: result.status };
                responseFunction(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    },

    /**
     * Request a data from user and filter center
     * @param res
     * @returns {*}
     */
    filterCener: async function filterCener(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let result: any = await vaccineCenterApiService.filterVaccineCenter(req);
                let meta: object = { message: result.message, status: result.status };
                responseFunction(meta, result.data, result.responsecode, res);
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    }
};

export default vaccineCenterApiController;