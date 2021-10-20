import bcrypt from "bcrypt";
import { Response, Request } from "express";
const otpGenerator = require('otp-generator')
import Otp, { IOtp } from "../model/Otp";

const sendOtpController = {
    /**
     * Request a mobile & password from User and login or register the user and return jwt token.
     * @param req
     * @param res
     * @returns {*}
     */
    loginRegister: async function loginRegister(req: Request, res: Response) {
        var messagebird = require('messagebird')('9pRSR4ladJjJHRGiV5Of35xW5');
        var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false, digits: true });
        var params = {
            'originator': 'MessageBird',
            'recipients': [
                req.body.mobile
            ],
            'body': 'Otp message for Cowid-19 your OTP is ' + otp
        };
        messagebird.messages.create(params, function (err: any, response: any) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            const otpFields: object = {
                otp: otp,
                expiration_time: new Date(new Date().getTime() + 3 * 60000),
                verified: false
            };
            otp = new Otp(otpFields);
            otp.save();
            return res.json(response);
        });
    },

    /**
     * Request a jwt token from User and return user data.
     * @param req
     * @param res
     * @returns {*}
     */
    userData: async function userData(req: Request, res: Response) {
        var messagebird = require('messagebird')('9pRSR4ladJjJHRGiV5Of35xW5');
        messagebird.messages.read('b265884fb5164e6eacdb1736f27a4350', function (err: any, response: any) {
            if (err) {
                return console.log(err);
            }
            console.log(response);
        });
    },

    verify: async function verify(req: Request, res: Response) {
        var otp = req.body.otp;
        var notExpire = await Otp.findOne({ otp: otp, verified: false, expiration_time: { $gt: new Date() } });
        if (notExpire) {
            res.status(200).json("your otp verified successfully");
            await Otp.updateOne(
                { otp: otp },
                { verified: true }
            );
        } else {
            res.status(403).json("your otp expired");
        }
    }
};

export default sendOtpController;
