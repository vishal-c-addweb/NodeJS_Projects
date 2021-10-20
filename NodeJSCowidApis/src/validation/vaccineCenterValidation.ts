export {};
const { body } = require('express-validator');

exports.validationBodyRulesForAddCenter = [
    body('centerName','centerName is required').notEmpty(),
    body('address','address is required').notEmpty(),
    body('name','name is vaccineType').notEmpty(),
    body('dose1','dose1 is required').notEmpty().isInt(),
    body('dose2','dose2 is required').notEmpty().isInt(),
    body('age','age is required').notEmpty(),
    body('cost','cost is required').notEmpty(),
    body('state','state is required').notEmpty(),
    body('city','city is required').notEmpty(),
    body('pinCode','pinCode is required & not less then 6 digit & not greater then 6 digit').notEmpty().isInt().isLength({min:6,max:6})  
];

exports.validationBodyRulesForGetCenterByPincode = [
    body('pinCode','pinCode is required & not less then 6 digit & not greater then 6 digit').notEmpty().isInt().isLength({min:6,max:6}),
];

exports.validationBodyRulesForGetCenterByCityState = [
    body('state','state is required').notEmpty(),
    body('city','city is required').notEmpty(),
];