import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken"
import User, { IUser } from "../model/User";

export function createToken(userId: string) {
    let token: string = jwt.sign(
        { user_id: userId },
        config.get("jwtSecret"),
        { expiresIn: config.get("jwtExpiration") }
    );
    return token;
}

// export async function userService(mobile: number, password: string) {
//     const salt: string = await bcrypt.genSalt(10);
//     const hashed: string = await bcrypt.hash(password, salt);
//     let user: IUser = await User.findOne({ mobile: mobile });
//     const userFields: object = {
//         mobile: mobile,
//         password: hashed
//     };
//     if (user) {
//         const isMatch: boolean = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             const token: string = createToken(user._id);
//             isResponseFlag = "isLoggedIn";
//             data: { token };
//             responseCode = responsecode.Success;
//         } else {
//             isResponseFlag = "invalidCredential";
//             data: dataArray;
//             responseCode = responsecode.Unauthorized;
//         }
//     } else {
//         user = new User(userFields);
//         await user.save();
//         const token: string = createToken(user._id);
//         isResponseFlag = "isRegistered";
//         data = { token };
//         responseCode = responsecode.Created;
//     }
//     let result: IResult = {
//         isResponseFlag: isResponseFlag,
//         data: data,
//         responseCode: responseCode
//     };
//     return result;
// }

export async function createUser(mobile: number, password: string) {
    const salt: string = await bcrypt.genSalt(10);
    const hashed: string = await bcrypt.hash(password, salt);
    let user: IUser = new User({
        mobile: mobile,
        password: hashed
    });
    await user.save();
    const token: string = createToken(user._id);
    return token;
}

export async function getUser(mobile: number) {
    let user: IUser = await User.findOne({ mobile: mobile });
    return user;
}

export async function getUserById(userId: string) {
    let user: IUser = await User.findById(userId);
    return user;
}