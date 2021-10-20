export {};
const { body } = require('express-validator');

exports.validationBodyRules = [
    body('photoIdProof','photoIdProof is required').notEmpty(),
    body('photoIdNumber','photoIdNumber is required').notEmpty(),
    body('name','name is required').notEmpty(),
    body('gender','gender is required').notEmpty(),
    body('yearOfBirth','yearOfBirth & not less then 4 & not greater then 4').notEmpty().isLength({ min: 4,max: 4 })
];