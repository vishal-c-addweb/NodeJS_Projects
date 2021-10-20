import User, { IMembers, IUser } from "../model/User";
import Request from "../types/Request";
import { dataArray } from "../response_builder/responsefunction";
import responsecode from "../response_builder/responsecode";

let message: string;
let status: string;
let data: object;
let responseCode: number;

function createMemberObject(req: Request) {
    const { photoIdProof, photoIdNumber, name, gender, yearOfBirth } = req.body;
    let refId: string = new Date().valueOf().toString();
    let secretCode: string = refId.substr(-4);
    let vaccinatedType: string = "Not Vaccinated";
    const memberFields: IMembers = {
        photoIdProof,
        photoIdNumber,
        name,
        gender,
        yearOfBirth,
        refId: refId,
        secretCode: secretCode,
        vaccinatedType: vaccinatedType,
        firstDose: {},
        secondDose: {}
    };
    return memberFields;
}

export async function addMemberService(req: Request) {
    let user: IUser = await User.findById(req.userId);
    if (!user) {
        message = "User not found";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    } else {
        if (user.members.length < 4) {
            let member: object[] = await User.find({ members: { $elemMatch: { photoIdNumber: req.body.photoIdNumber } } });
            if (member.length === 0) {
                await User.updateOne(
                    { _id: req.userId },
                    { $push: { members: createMemberObject(req) } }
                );
                let user: IUser = await User.findById(req.userId);
                message = "member registered successfully";
                status = "Success";
                data = user;
                responseCode = responsecode.Created;
            } else {
                message = "member already registered";
                status = "Failed";
                data = dataArray;
                responseCode = responsecode.Conflict;
            }
        } else {
            message = "you can only add 4 members";
            status = "Failed";
            data = dataArray;
            responseCode = responsecode.Bad_Request;
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


export async function deleteMemberService(req: Request) {
    let user: IUser = await User.findById(req.userId);
    if (!user) {
        message = "User not found";
        status = "Failed";
        data = dataArray;
        responseCode = responsecode.Not_Found;
    } else {
        if (user.members.length > 0) {
            for (let i = 0; i < user.members.length; i++) {
                const element = user.members[i];
                if (element.firstDose === undefined) {
                    await User.updateOne(
                        { "_id": req.userId },
                        { $pull: { members: { refId: req.query.refId } } }
                    );
                    let user: IUser = await User.findById(req.userId);
                    message = "member deleted successfully";
                    status = "Success";
                    data = user;
                    responseCode = responsecode.Success;
                } else {
                    message = "you are not able to delete member";
                    status = "Failure";
                    data = dataArray;
                    responseCode = responsecode.Forbidden;
                }
            }
        } else {
            message = "you are not able to delete member";
            status = "Failure";
            data = dataArray;
            responseCode = responsecode.Forbidden;
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