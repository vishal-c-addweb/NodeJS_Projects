import { Response } from "express";

export function responseFunction<T>(meta: object, data: object, resCode: number, res: Response) {
    let response: object = { meta, data };
    return { statusCode: resCode, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) };
}

export function responseFunctions<T>(meta: object, data: object, resCode: number) {
    return { statusCode: resCode, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) };
}

export const dataArray: object = {};