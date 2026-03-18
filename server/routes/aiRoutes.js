import express from "express";
import { aiChatBot } from "../controller/AiChatBot.js";

const router = express.Router()

router.post('/makaan-mantri',aiChatBot)

export default router