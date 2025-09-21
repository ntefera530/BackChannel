import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as chatController from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protectRoute, chatController.getAllChats); //query param type = direct or group
router.get("/:chatId/messages", protectRoute, chatController.getAllMessagesInChat); 

router.post("/", protectRoute, chatController.createChat);//query param type = direct or group
router.post("/:chatId/participants", protectRoute, chatController.addParticipantsToChat);

router.delete("/:chatId", protectRoute, chatController.deleteGroupChat); //(owner only)
router.delete("/:chatId/participants/me", protectRoute, chatController.leaveGroupChat);
router.delete("/:chatId/participant", protectRoute, chatController.kickUsersFromGroupChat); //Body: Users
router.delete("/:chatId/messages", protectRoute, chatController.deleteAllMessagesInChat);  // Delete All Messages in Chat
router.delete("/:chatId/messages/:messageId", protectRoute, chatController.getAllMessagesInChat); // Delete Specific Message in Chat


export default router;