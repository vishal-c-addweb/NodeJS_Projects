import Request from "../types/Request";
import { dataArray } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import VaccineCenter, { IVaccineCenter } from "../model/vaccineCenter";
import moment from "moment";

let message: string;
let status: string;
let data: object;
let responseCode: number;

function createVaccineCenterObject(req: Request) {
    const { centerName, address, cost, state, city, pinCode } = req.body;
    const vaccine: any = [{
        date: moment(new Date()).format("D MMMM y"),
        name: req.body.name,
        dose1: req.body.dose1,
        dose2: req.body.dose2,
        age: req.body.age,
        price: req.body.price ? req.body.price : ""
    }];
    const centerFields: IVaccineCenter = {
        centerName,
        address,
        vaccine: vaccine,
        cost,
        state,
        city,
        pinCode,
        isAvailable: true
    };
    return centerFields;
}

export async function addVaccineCenterService(req: Request) {
    let center: any = await VaccineCenter.findOne({ "centerName": req.body.centerName });
    if (center) {
        message = "Center already exist";
        status = "Success";
        data = center;
        responseCode = responsecode.Forbidden;
    } else {
        center = new VaccineCenter(createVaccineCenterObject(req));
        await center.save();
        message = "Center Created successfully";
        status = "Success";
        data = center;
        responseCode = responsecode.Created;
    }
    let result: object = {
        message: message,
        status: status,
        data: data,
        responsecode: responseCode
    }
    return result;
}

export async function updateVaccineCenterService(req: Request) {
    let id: string = req.body.centerId;
    let center: IVaccineCenter = await VaccineCenter.findOne({ "_id": id });
    if (!center) {
        message = "Center not exist";
        status = "Failed";
        data = [];
        responseCode = responsecode.Not_Found;
    } else {
        let centers: any = await filteringVaccineCenterForAdd(req);
        if (centers.length === 0) {
            message = "vaccine already addedd";
            status = "Failed";
            data = dataArray;
            responseCode = responsecode.Forbidden;
        } else {
            message = "vaccine addedd successfully";
            status = "Success";
            data = centers;
            responseCode = responsecode.Created;
        }
    }
    let result: object = {
        message: message,
        status: status,
        data: data,
        responsecode: responseCode
    }
    return result;
}

export async function getVaccineCenterByPincode(req: Request) {
    let center: object[] = await VaccineCenter.find({ pinCode: req.body.pinCode });
    if (center.length !== 0) {
        message = "Center fetch successfully";
        status = "Success";
        data = center;
        responseCode = responsecode.Success;
    } else {
        message = "Center not found";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    }
    let result: object = {
        message: message,
        status: status,
        data: data,
        responsecode: responseCode
    }
    return result;
}

export async function getVaccineCenterByCityState(req: Request) {
    let center: object[] = await VaccineCenter.find({ "state": req.body.state, "city": req.body.city });
    if (center.length !== 0) {
        message = "Center fetch successfully";
        status = "Success";
        data = center;
        responseCode = responsecode.Success;
    } else {
        message = "Center not found";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    }
    let result: object = {
        message: message,
        status: status,
        data: data,
        responsecode: responseCode
    }
    return result;
}

async function filteringVaccineCenterForAdd(req: Request) {
    let centerId: string = req.body.centerId;
    let date: string = req.body.date ? req.body.date : null;
    let age: string = req.body.age ? req.body.age : null;
    let name: string = req.body.name ? req.body.name : null;
    let dose1: number = req.body.dose1 ? req.body.dose1 : "";
    let dose2: number = req.body.dose2 ? req.body.dose2 : "";
    let price: number = req.body.price ? req.body.price : "";
    const vaccine: any = [{
        date: date,
        name: name,
        dose1: dose1,
        dose2: dose2,
        age: age,
        price: price
    }];
    if (age !== null && name !== null) {
        let center: any = await VaccineCenter.findOne({ "_id": centerId });
        let vaccines: any = center.vaccine;
        let ageGroup = [];
        let nameGroup = [];
        let dateGroup = [];
        for (let i = 0; i < vaccines.length; i++) {
            if (vaccines[i].date < moment().format("D MMMM y")) {
                await VaccineCenter.updateOne(
                    { "_id": centerId },
                    { $pull: { vaccine: { date: vaccines[i].date } } }
                );
            }
            ageGroup.push(vaccines[i].age);
            nameGroup.push(vaccines[i].name);
            dateGroup.push(vaccines[i].date);
        }
        if (!dateGroup.includes(date)) {
            await VaccineCenter.updateOne(
                { "_id": centerId },
                { $push: { vaccine: vaccine } }
            );
            return await VaccineCenter.find({ "_id": centerId });
        } else {
            if (!ageGroup.includes(age) || !nameGroup.includes(name)) {
                await VaccineCenter.updateOne(
                    { "_id": centerId },
                    { $push: { vaccine: vaccine } }
                );
                return await VaccineCenter.find({ "_id": centerId });
            } else {
                center = [];
                return center;
            }
        }
    }
}

export async function filterVaccineCenter(req: Request) {
    let pincode: number = req.body.pinCode ? req.body.pinCode : null;
    let city: string = req.body.city ? req.body.city : null;
    let state: string = req.body.state ? req.body.state : null;
    let cost: any = req.body.cost ? req.body.cost : null;
    let age: any = req.body.age ? req.body.age : null;
    let name: any = req.body.name ? req.body.name : null;
    let center: any;
    if (pincode !== null && city === null && state === null) {
        if (cost !== null) {
            let costArray = cost.split(",");
            console.log(costArray);
            center = await VaccineCenter.find({ pinCode: pincode, "cost": costArray });
        } else if (name !== null) {
            let nameArray = name.split(",");
            console.log(nameArray);
            center = await VaccineCenter.aggregate([
                { $match: { "pinCode": pincode, 'vaccine.name': { $in: nameArray } } },
                {
                    $project: {
                        vaccine: {
                            $filter: {
                                input: '$vaccine',
                                as: 'vaccine',
                                cond: { $eq: ['$$vaccine.name', nameArray] }
                            }
                        }, centerName: 1
                    }
                }
            ]);
        } else {
            center = await VaccineCenter.find({ pinCode: pincode });
        }
    } else if (pincode === null && city !== null && state !== null) {
        if (cost !== null) {
            center = await VaccineCenter.find({ pinCode: pincode, cost: cost });
        } else {
            center = await VaccineCenter.find({ pinCode: pincode });
        }
    }
    if (center.length !== 0) {
        message = "Center fetch successfully";
        status = "Success";
        data = center;
        responseCode = responsecode.Success;
    } else {
        message = "Center not found";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    }
    let result: object = {
        message: message,
        status: status,
        data: data,
        responsecode: responseCode
    }
    return result;
}

async function filterByPincode(req: Request) {
}