import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, deleteMessage, deleteAllMessages } from "../controllers/messageController.js";


const router = express.Router();

//TODO Protect all of these

//get messages + pagination - for page initial loadup and scroll up for more  messages
//router.get("/messages/:chatId", protectRoute, getMessages);

//UNprotected to Test
router.get("/messages/:chatId", getMessages);
router.delete("/messages/:messageId", deleteMessage);
router.delete("/messages", deleteAllMessages);


export default router;