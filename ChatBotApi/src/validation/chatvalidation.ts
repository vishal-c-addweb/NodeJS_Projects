export { };
const Schema = require("schema-js");
const { body } = require('express-validator');

exports.validationBodyRulesAddChats = [
    body('question', 'question is required').notEmpty(),
    body('answer', 'answer is required').notEmpty()
];

exports.validationBodyRulesChatBots = [
    body('question', 'question is required').notEmpty()
];