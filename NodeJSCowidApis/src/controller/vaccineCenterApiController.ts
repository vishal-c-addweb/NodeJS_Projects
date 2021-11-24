import { Response } from "express";
import Request from "../types/Request";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as vaccineCenterApiService from "../service/vaccineCenterApiService";
import VaccineCenter, { IVaccineCenter } from "../model/vaccineCenter";
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
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let center: IVaccineCenter = await vaccineCenterApiService.getCenterByName(req.body.centerName);
                if (center) {
                    let meta: object = { message: "Center already exist", status: "Success" };
                    responseFunction(meta, center, responsecode.Forbidden, res);
                } else {
                    let center: any = new VaccineCenter(vaccineCenterApiService.createVaccineCenterObject(req));
                    await center.save();
                    let meta: object = { message: "Center Created successfully", status: "Success" };
                    responseFunction(meta, center, responsecode.Created, res);
                }
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
                let center: object[] = await vaccineCenterApiService.getVaccineCenterByPincode(req.body.pinCode);
                if (center.length !== 0) {
                    let cost: any = req.body.cost ? req.body.cost : null;
                    let age: string = req.body.age ? req.body.age : null;
                    let name: string = req.body.name ? req.body.name : null;
                    let result = await vaccineCenterApiService.filterCenters(center,cost,age,name);
                    return res.status(result.meta['response_code']).json(result);
                } else {
                    let result = {
                        meta: {
                            "response_code": responsecode.Not_Found,
                            "message": "Center not found",
                            "status": "Failed"
                        },
                        data: dataArray
                    }
                    return res.status(result.meta['response_code']).json(result);
                }
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
                let center: object[] = await vaccineCenterApiService.getVaccineCenterByCityState(req.body.state,req.body.city);
                if (center.length !== 0) {
                    let cost: any = req.body.cost ? req.body.cost : null;
                    let age: string = req.body.age ? req.body.age : null;
                    let name: string = req.body.name ? req.body.name : null;
                    let result = await vaccineCenterApiService.filterCenters(center,cost,age,name);
                    return res.status(result.meta['response_code']).json(result);
                } else {
                    let result = {
                        meta: {
                            "response_code": responsecode.Not_Found,
                            "message": "Center not found",
                            "status": "Failed"
                        },
                        data: dataArray
                    }
                    return res.status(result.meta['response_code']).json(result);
                }
            } catch (err) {
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    }
};

export default vaccineCenterApiController;