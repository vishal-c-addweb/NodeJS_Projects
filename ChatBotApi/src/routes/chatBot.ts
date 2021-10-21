import { Router } from "express";
import chatBotController from "../controller/chatBotController";
const chatvalidation = require('../validation/chatvalidation');
const router: Router = Router();

// @route   POST chatbot
// @desc    Give question returns the answer.
router.post("/chatbot", chatvalidation.validationBodyRulesChatBots, chatBotController.chatBot);


// @route   POST chatbot
// @desc    Give question returns the answer.
router.post("/addchat", chatvalidation.validationBodyRulesAddChats, chatBotController.addChat);

export default router;