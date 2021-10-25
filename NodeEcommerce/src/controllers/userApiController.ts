import config from "config";
import User, { IUser } from "../models/User";
import { Response } from "express";
import Request from "../types/Request";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
    register: async function register(req: Request, res: Response) {
        try {
            const newUser: IUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET)
            });
            const savedUser: any = await newUser.save();
            let meta: object = { message: "Registered Successfully", status: "Success"};
            responseFunction(meta, savedUser, responsecode.Created, res);
        } catch (error) {
            let meta: object = { message: "Server error", status: "Failed" };
            responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
        }
    },

    login: async function login(req: Request, res: Response) {
        try {
            const user: any = await User.findOne({ userName: req.body.userName });
            const hashPassword: any = CryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET);
            const password: string = hashPassword.toString(CryptoJs.enc.Utf8);
            if (user && password === req.body.password) {
                const { password, ...others } = user._doc;
                const token: string = jwt.sign(
                    { user_id: user._id, user_isAdmin: user.isAdmin },
                    config.get("jwtSecret"),
                    { expiresIn: config.get("jwtExpiration") }
                );
                let data: object = {
                    "data": others,
                    "token": token
                };
                let meta: object = { message: "logged in successfully", status: "Success" };
                responseFunction(meta, data, responsecode.Success, res);
            } else {
                let meta: object = { message: "wrong credential", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Forbidden, res);
            }
        } catch (error) {
            let meta: object = { message: "Server error", status: "Failed" };
            responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
        }
    },

    update: async function update(req: Request, res: Response) {
        if (req.body.password) {
            req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
        }
        try {
            if (req.isAdmin) {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });
                let meta: object = { message: "User updated successfully", status: "Success" };
                responseFunction(meta, updatedUser, responsecode.Success, res);
            } else {
                let meta: object = { message: "you are not allowed to do that", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Forbidden, res);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    deleteUser: async function deleteUser(req: Request, res: Response) {
        try {
            if (req.isAdmin) {
                await User.findByIdAndDelete(req.params.id);
                let result = {
                    "meta": { "status": 200, "message": "deleted successfully" },
                    "data": { "data": {} }
                };
                let meta: object = { message: "User Deleted successfully", status: "Success" };
                responseFunction(meta, dataArray, responsecode.Success, res);
            } else {
                let meta: object = { message: "you are not allowed to do that", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Forbidden, res);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    getUser: async function getUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            if (user) {
                let meta: object = { message: "User Fetched successfully", status: "Success" };
                responseFunction(meta, user, responsecode.Success, res);
            } else {
                let meta: object = { message: "user not found", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Not_Found, res);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default userController;