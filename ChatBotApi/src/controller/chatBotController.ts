import { Response, Request } from "express";
import Bot, { IBot } from "../model/Bot";
const { validationResult } = require('express-validator');

const chatBotController = {
    /**
     * Request a question from user return answer.
     * @param req
     * @param res
     * @returns {*}
     */
    chatBot: async function chatBot(req: Request, res: Response) {
        const errors: any = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ "status": "failed", "message": "Bad request", "errors": errors.array() });
        } else {
            let q: string = req.body.question;
            let bot: any = await Bot.findOne({ botQuestions: { $elemMatch: { "question": q } } })
            if (bot) {
                let arr: any = [];
                for (let i = 0; i < bot.botQuestions.length; i++) {
                    let item: any = bot.botQuestions;
                    if (item[i].question === q) {
                        let ans: string = item[i].answer;
                        return res.status(200).json({ "staus": "success", "message": "answer for this question", "answer": ans });
                    }
                    arr.push(item[i].question);
                }
                if (!arr.includes(q)) {
                    return res.status(400).json({ "status": "failed", "message": "not found" });
                }
            } else {
                return res.status(400).json({ "status": "failed", "message": "not found" });
            }
        }
    },

    /**
     * Request a question from user return answer.
     * @param req
     * @param res
     * @returns {*}
     */
    addChat: async function addChat(req: Request, res: Response) {
        const errors: any = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ "status": "failed", "message": "Bad request", "errors": errors.array() });
        } else {
            let q: string = req.body.question;
            let a: string = req.body.answer;
            let bot: any = await Bot.findById(req.body.id);
            if (!bot) {
                let bot: IBot = new Bot();
                await bot.save();
                return res.status(201).json({ "staus": "success", "message": "bot created successfully" });
            } else {
                if (bot.botQuestions.length === 0) {
                    await Bot.updateOne(
                        { "_id": req.body.id },
                        { $push: { botQuestions: [{ "question": q, "answer": a }] } }
                    );
                    let data: IBot = await Bot.findById(req.body.id);
                    return res.status(403).json({ "status": "success", "message": "question & answer addedd successfully", "data": data });
                } else {
                    let arr: any = [];
                    for (let j = 0; j < bot.botQuestions.length; j++) {
                        let item: any = bot.botQuestions;
                        if (item[j].question === q) {
                            return res.status(403).json({ "status": "failed", "message": "question already exists" });
                        }
                        arr.push(item[j].question);
                    }
                    if (!arr.includes(q)) {
                        await Bot.updateOne(
                            { "_id": req.body.id },
                            { $push: { botQuestions: [{ "question": q, "answer": a }] } }
                        );
                        let data: IBot = await Bot.findById(req.body.id);
                        return res.status(403).json({ "status": "success", "message": "question & answer addedd successfully", "data": data });
                    }
                }
            }
        }
    }
};

export default chatBotController;
