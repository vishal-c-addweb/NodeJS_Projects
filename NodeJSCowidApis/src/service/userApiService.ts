import bcrypt from "bcrypt";
import config from "config";
import Request from "../types/Request";
import jwt from "jsonwebtoken"
import responsecode from "../response_builder/responsecode";
import { dataArray } from "../response_builder/responsefunction";
import User, { IUser } from "../model/User";

let message: string;
let status: string;
let data: object;
let responseCode: number;

function createToken(user: IUser) {
    return jwt.sign(
        { user_id: user._id },
        config.get("jwtSecret"),
        { expiresIn: config.get("jwtExpiration") }
    );
}
export async function userService(req: Request) {
    const { mobile, password } = req.body;
    const salt: string = await bcrypt.genSalt(10);
    const hashed: string = await bcrypt.hash(password, salt);
    let user: IUser = await User.findOne({ mobile: mobile });
    const userFields: object = {
        mobile,
        password: hashed
    };
    if (user) {
        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token: string = createToken(user);
            message = "logged in successfully";
            status = "Success";
            data = { token };
            responseCode = responsecode.Success;
        } else {
            message = "Invalid Credential";
            status = "Failed";
            data = dataArray;
            responseCode = responsecode.Unauthorized;
        }
    } else {
        user = new User(userFields);
        await user.save();
        const token: string = createToken(user);
        message = "registered successfully";
        status = "Success";
        data = { token };
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
