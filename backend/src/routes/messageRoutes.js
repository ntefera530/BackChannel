import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, deleteMessage, deleteAllMessages } from "../controllers/messageController.js";


const router = express.Router();

//TODO Protect all of these

//get messages + pagination - for page initial loadup and scroll up for more  messages
//router.get("/messages/:chatId", protectRoute, getMessages);

//UNprotected to Test
router.get("/me/:chatId", protectRoute, getMessages);
router.delete("/me/:chatId/:messageId", protectRoute, deleteMessage);
router.delete("/me/:chatId", protectRoute, deleteAllMessages);


export default router;