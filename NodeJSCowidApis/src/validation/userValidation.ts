export {};
const Schema = require("schema-js");
const { body } = require('express-validator');

exports.validationBodyRules = [
    body('mobile','mobile must be 10 digit number & not empty').notEmpty().isInt().isLength({ max: 10, min: 10 }),
    body('password','password must be not less then 8 & not empty').notEmpty().isLength({ min: 8 }),
];
