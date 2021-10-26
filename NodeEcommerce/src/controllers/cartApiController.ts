import Cart, { ICart } from "../models/Cart";
import { Response } from "express";
import Request from "../types/Request";
import { dataArray, responseFunction } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
require('dotenv').config();

const cartController = {
    addToCart: async function addToCart(req: Request, res: Response) {
        const newCart: ICart = new Cart(req.body);
        try {
            const savedCart: any = await newCart.save();
            let meta: object = { message: "Product Added Successfully", status: "Success" };
            responseFunction(meta, savedCart, responsecode.Created, res);
        } catch (error) {
            let meta: object = { message: "Server error", status: "Failed" };
            responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
        }
    },

    updateCart: async function updateCart(req: Request, res: Response) {
        try {
            if (req.userId === req.params.id || req.isAdmin) {
                const updatedCart: ICart = await Cart.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                let meta: object = { message: "Cart Updated Successfully", status: "Success" };
                responseFunction(meta, updatedCart, responsecode.Created, res);
            } else {
                let meta: object = { message: "you are not allowed to do that", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Forbidden, res);
            }
        } catch (error) {
            let meta: object = { message: "Server error", status: "Failed" };
            responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);
        }
    },
    
    deleteCart: async function deleteCart(req: Request, res: Response) {
        try {
            if (req.userId === req.params.id || req.isAdmin) {
                await Cart.findByIdAndDelete(req.params.id);
                let meta: object = { message: "Cart Deleted successfully", status: "Success" };
                responseFunction(meta, dataArray, responsecode.Success, res);
            } else {
                let meta: object = { message: "you are not allowed to do that", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Forbidden, res);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    getCart: async function getCart(req: Request, res: Response) {
        try {
            const cart: any = await Cart.findOne({userId: req.params.userId});
            if (req.userId === req.params.id || req.isAdmin) { 
                if (cart) {
                    let meta: object = { message: "Cart Fetched successfully", status: "Success" };
                    responseFunction(meta, cart, responsecode.Success, res);
                } else {
                    let meta: object = { message: "Cart not found", status: "Failed" };
                    responseFunction(meta, dataArray, responsecode.Not_Found, res);
                }
            } else {
                let meta: object = { message: "you are not allowed to do that", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Forbidden, res);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    getAllCart: async function getAllCart(req: Request, res: Response) {
        try {
            if (req.isAdmin) { 
                let cart: any = await Cart.find();
                if (cart) {    
                    let meta: object = { message: "Cart Fetched successfully", status: "Success" };
                    responseFunction(meta, cart, responsecode.Success, res);
                } else {
                    let meta: object = { message: "Cart not found", status: "Failed" };
                    responseFunction(meta, dataArray, responsecode.Not_Found, res); 
                }
            } else {
                let meta: object = { message: "you are not allowed to do that", status: "Failed" };
                responseFunction(meta, dataArray, responsecode.Forbidden, res);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default cartController;