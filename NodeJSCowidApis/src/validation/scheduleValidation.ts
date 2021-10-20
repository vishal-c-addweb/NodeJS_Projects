export {};
const { body } = require('express-validator');

exports.validationBodyRules = [
    body('refId','refId is required & length is not less then 13 & not greater then 13').notEmpty().isLength({ min: 13,max: 13 }),
    body('address','address is required').notEmpty(),
    body('vaccineType','name is vaccineType').notEmpty(),
    body('age','age is required').notEmpty(),
    body('cost','cost is required').notEmpty(),
    body('date','date & not less then 4 & not greater then 4').notEmpty(),
    body('timeSlot','timeSlot & not less then 4 & not greater then 4').notEmpty()    
];