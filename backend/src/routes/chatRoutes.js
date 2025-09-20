import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as chatController from "../controllers/chatController.js";

const router = express.Router();

// Get
router.get("/me", protectRoute, chatController.getAllChats);
router.get("/me/:friendId", protectRoute, chatController.getDmChatIdByFriend);


// Post
router.post("/me/direct", protectRoute, chatController.createDirectMessage);
router.post("/me/group", protectRoute, chatController.createGroupChat);
router.post("/me/:chatId/", protectRoute, chatController.addParticipantsToChat);

// Delete
router.delete("/me/:chatId", protectRoute, chatController.deleteGroupChat);
router.delete("/me/:chatId/participant/me", protectRoute, chatController.leaveGroupChat);
router.delete("/me/:chatId/participant/:userId", protectRoute, chatController.kickUserFromGroupChat);


export default router;