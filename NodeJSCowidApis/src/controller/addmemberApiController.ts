import { Response } from "express";
import Request from "../types/Request";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import * as userApiService from "../service/userApiService";
import * as addmemberService from "../service/addmemberService";
import { IUser } from "../model/User";
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
            let meta: object = { message: "Bad Request", status: "Failed", errors: errors.array() };
            responseFunction(meta, dataArray, responsecode.Bad_Request, res);
        } else {
            try {
                let user: IUser = await userApiService.getUserById(req.userId);
                if (!user) {
                    let meta: object = { message: "User not found", status: "Failed" };
                    responseFunction(meta, dataArray, responsecode.Not_Found, res);
                } else {
                    if (user.members.length < 4) {
                        let member: object[] = await addmemberService.getMember(req.body.photoIdNumber);
                        if (member.length === 0) {
                            const { photoIdProof, photoIdNumber, name, gender, yearOfBirth } = req.body;
                            let result: object = await addmemberService.addMemberService(req.userId,photoIdProof,photoIdNumber,name,gender,yearOfBirth);
                            let meta: object = { message: "member registered successfully", status: "Success" };
                            responseFunction(meta, result, responsecode.Created, res);
                        } else {
                            let meta: object = { message: "member already registered", status: "Failed" };
                            responseFunction(meta, dataArray, responsecode.Conflict, res);
                        }
                    } else {
                        let meta: object = { message: "you can only add 4 members", status: "Failed" };
                        responseFunction(meta, dataArray, responsecode.Bad_Request, res);
                    }
                }
            } catch (err) {
                console.error(err.message);
                let meta: object = { message: "Server error", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
            }
        }
    },

    deleteMember: async function deleteMember(req: Request, res: Response) {
        try {
            let user: IUser = await userApiService.getUserById(req.userId);
            if (!user) {
                let meta: object = { message: "User not found", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Not_Found, res);
            } else {
                for (let i = 0; i < user.members.length; i++) {
                    if (user.members.length > 0 && user.members[i].firstDose === undefined) {
                        if (user.members[i].refId === req.query.refId) {
                            let result: object = await addmemberService.deleteMemberService(req.userId, req.query.refId);
                            let meta: object = { message: "member deleted successfully", status: "Success" };
                            responseFunction(meta, result, responsecode.Success, res);
                        } else {
                            let meta: object = { message: "member already deleted", status: "Failure" };
                            responseFunction(meta, dataArray, responsecode.Forbidden, res);
                        }
                    } else {        
                        let meta: object = { message: "you are not able to delete member", status: "Failure" };
                        responseFunction(meta, dataArray, responsecode.Forbidden, res);
                    }
                }
            }
        } catch (err) {
            let meta: object = { message: "Server error", status: "Failed" };
            responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
        }
    }
};

export default addmemberApiController;