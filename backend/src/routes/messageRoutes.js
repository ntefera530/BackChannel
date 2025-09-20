import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as messageController from "../controllers/messageController.js";

const router = express.Router();

// Get
router.get("/me/:chatId", protectRoute, messageController.getAllMessages);

// Post

// Delete
router.delete("/me/:chatId/:messageId", protectRoute, messageController.deleteMessage);
router.delete("/me/:chatId", protectRoute, messageController.deleteAllMessages);

export default router;