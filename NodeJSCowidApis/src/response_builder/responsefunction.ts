import { Response } from "express";

/** Generic function for success & error message */
export function success<T>(meta: object, data: object) {
    let response: object = { meta, data };
    return response;
}

export function successErrorResponse<T>(meta: object, data: object, res_code: number, res: Response) {
    let response: object = { meta, data };
    return res.status(res_code).json(response);
}

export function error<T>(meta: object, data: object) {
    let response: object = { meta, data };
    return response;
}

export const dataArray: object = {};