import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, deleteMessage, deleteAllMessages } from "../controllers/messageController.js";


const router = express.Router();

router.get("/me/:chatId", protectRoute, getMessages);
router.delete("/me/:chatId/:messageId", protectRoute, deleteMessage);
router.delete("/me/:chatId", protectRoute, deleteAllMessages);

export default router;