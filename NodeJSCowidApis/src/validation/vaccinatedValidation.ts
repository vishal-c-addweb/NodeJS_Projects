export {};
const { body } = require('express-validator');

exports.validationBodyRules = [
    body('secretCode','secretCode is required').notEmpty().isLength({ max: 4, min: 4 }),
    body('dose','dose is required').notEmpty()
];