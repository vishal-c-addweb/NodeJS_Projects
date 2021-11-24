import Request from "../types/Request";
import { dataArray } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";
import VaccineCenter, { IVaccineCenter } from "../model/vaccineCenter";
import { IResult } from "../model/User";
import moment from "moment";

let message: string;
let status: string;
let data: object;
let responseCode: number;

export function createVaccineCenterObject(req: Request) {
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

export async function getCenterByName(centerName:string) {
    let center: any = await VaccineCenter.findOne({ "centerName": centerName });
    return center;
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
            message = "vaccine already added";
            status = "Failed";
            data = dataArray;
            responseCode = responsecode.Forbidden;
        } else {
            message = "vaccine added successfully";
            status = "Success";
            data = centers;
            responseCode = responsecode.Created;
        }
    }
    let result: IResult = {
        message: message,
        status: status,
        data: data,
        responsecode: responseCode
    }
    return result;
}

export async function getVaccineCenterByPincode(pinCode:number) {
    let center: object[] = await VaccineCenter.find({ pinCode: pinCode });
    return center;
}

export async function getVaccineCenterByCityState(state:string,city:string) {
    let center: object[] = await VaccineCenter.find({ "state": state, "city": city });
    return center;
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

/* new api functions */
export async function getVaccineCenterByPincodeAndCost(center:any,cost:string) {
    let costArray = cost.split(",");
    let centerArr: any = [];
    for (let j = 0; j < center.length; j++) {
        if (costArray.includes(center[j].cost)) {
            let centerObj = getCenter(center[j],center[j].vaccine);
            centerArr.push(centerObj);
        }
    }
    console.log(centerArr);
    return centerArr;
}

export async function getVaccineCenterByPincodeAndAge(center:any,age:string) {
    let ageArray: string[] = age.split(",");
    let vaccine: any = [];
    let centerArr: any = [];
    for (let j = 0; j < center.length; j++) {
        for (let k = 0; k < center[j].vaccine.length; k++) {
            if (ageArray.includes(center[j].vaccine[k].age)) {
                vaccine.push(center[j].vaccine[k]);
            }
        }
        let centerObj = getCenter(center[j],vaccine);
        if (centerObj.vaccine.length !== 0) {
            centerArr.push(centerObj);
        } else {

        }
        vaccine = [];
    }
    return centerArr;
}

export async function getVaccineCenterByPincodeAndName(center:any,name:string) {
    let nameArray: string[] = name.split(",");
    let vaccine: any = [];
    let centerArr: any = [];
    for (let j = 0; j < center.length; j++) {
        for (let k = 0; k < center[j].vaccine.length; k++) {
            if (nameArray.includes(center[j].vaccine[k].name)) {
                vaccine.push(center[j].vaccine[k]);
            }
        }
        let centerObj = getCenter(center[j],vaccine);
        if (centerObj.vaccine.length !== 0) {
            centerArr.push(centerObj);
        }
        vaccine = [];
    }
    return centerArr;
}

export async function getVaccineCenterByPincodeAndCostAndAge(center:any,cost:string,age:string) {
    let costArray: string[] = cost.split(",");
    let ageArray: string[] = age.split(",");
    let vaccine: any = [];
    let centerArr: any = [];
    for (let j = 0; j < center.length; j++) {
        for (let k = 0; k < center[j].vaccine.length; k++) {
            if (costArray.includes(center[j].cost) && ageArray.includes(center[j].vaccine[k].age)) {
                vaccine.push(center[j].vaccine[k]);
            }
        }
        let centerObj = getCenter(center[j],vaccine);
        if (centerObj.vaccine.length !== 0) {
            centerArr.push(centerObj);
        }
        vaccine = [];
    }
    return centerArr;
}

export async function getVaccineCenterByPincodeAndAgeAndName(center:any,age:string,name:string) {
    let ageArray: string[] = age.split(",");
    let nameArray: string[] = name.split(",");
    let vaccine: any = [];
    let centerArr: any = [];
    for (let j = 0; j < center.length; j++) {
        for (let k = 0; k < center[j].vaccine.length; k++) {
            if (ageArray.includes(center[j].vaccine[k].age) && nameArray.includes(center[j].vaccine[k].name)) {
                vaccine.push(center[j].vaccine[k]);
            }
        }
        let centerObj = getCenter(center[j],vaccine);
        if (centerObj.vaccine.length !== 0) {
            centerArr.push(centerObj);
        }
        vaccine = [];
    }
    return centerArr;
}

export async function getVaccineCenterByPincodeAndNameAndCost(center:any,name:string,cost:string) {
    let nameArray: string[] = name.split(",");
    let costArray: string[] = cost.split(",");
    let vaccine: any = [];
    let centerArr: any = [];
    for (let j = 0; j < center.length; j++) {
        for (let k = 0; k < center[j].vaccine.length; k++) {
            if (nameArray.includes(center[j].vaccine[k].name) && costArray.includes(center[j].cost)) {
                vaccine.push(center[j].vaccine[k]);
            }
        }
        let centerObj = getCenter(center[j],vaccine);
        if (centerObj.vaccine.length !== 0) {
            centerArr.push(centerObj);
        }
        vaccine = [];
    }
    return centerArr;
}

export async function getVaccineCenterByPincodeAndCostAndAgeAndName(center:any,cost:string,name:string,age:string) {
    let costArray: string[] = cost.split(",");
    let nameArray: string[] = name.split(",");
    let ageArray: string[] = age.split(",");
    let vaccine: any = [];
    let centerArr: any = [];
    for (let j = 0; j < center.length; j++) {
        for (let k = 0; k < center[j].vaccine.length; k++) {
            if (costArray.includes(center[j].cost) && nameArray.includes(center[j].vaccine[k].name) && ageArray.includes(center[j].vaccine[k].age)) {
                vaccine.push(center[j].vaccine[k]);
            }
        }
        let centerObj = getCenter(center[j],vaccine);
        if (centerObj.vaccine.length !== 0) {
            centerArr.push(centerObj);
        }
        vaccine = [];
    }
    return centerArr;
}

export async function filterCenters(centers:object[],cost:string,age:string,name:string) {
    let result:any;
    if (cost === null && age === null && name === null) {
        result = checkCenterIsExists(centers);
    } else if (cost !== null && age === null && name === null) {
        let center: object[] = await getVaccineCenterByPincodeAndCost(centers,cost);
        result = checkCenterIsExists(center);
    } else if (cost === null && age !== null && name === null) {
        let center: any = await getVaccineCenterByPincodeAndAge(centers,age);   
        result = checkCenterIsExists(center);
    } else if (cost === null && age === null && name !== null) {
        let center: any = await getVaccineCenterByPincodeAndName(centers, name);
        result = checkCenterIsExists(center);
    } else if (cost !== null && age !== null && name === null) {
        let center: any = await getVaccineCenterByPincodeAndCostAndAge(centers, cost, age);
        result = checkCenterIsExists(center);
    } else if (cost === null && age !== null && name !== null) {
        let center: any = await getVaccineCenterByPincodeAndAgeAndName(centers, cost, age);
        result = checkCenterIsExists(center);
    } else if (cost !== null && age === null && name !== null) {
        let center: any = await getVaccineCenterByPincodeAndNameAndCost(centers, name, cost);
        result = checkCenterIsExists(center);
    } else if (cost !== null && age !== null && name !== null) {
        let center: any = await getVaccineCenterByPincodeAndCostAndAgeAndName(centers,cost,name,age);
        result = checkCenterIsExists(center);
    } else {
        result = checkCenterIsExists(centers);
    }
    return result;
}

function checkCenterIsExists(center: object[]) {
    let result;
    if (center.length === 0) {
        result = {
            meta: {
                "response_code": responsecode.Not_Found,
                "message": "Center not found",
                "status": "Failed"
            },
            data: dataArray
        }
    } else {
        result = {
            meta: {
                "response_code": responsecode.Success,
                "message": "Center Fetched Successfully",
                "status": "Success"
            },
            date: center
        }
    }
    return result;
}

function getCenter(center:any,vaccine:any) {
    let centerObj = {
        _id: center.id,
        centerName: center.centerName,
        address: center.address,
        vaccine: vaccine,
        cost: center.cost,
        state: center.state,
        city: center.city,
        pinCode: center.pinCode,
        isAvailable: center.isAvailable
    }
    return centerObj;
}



