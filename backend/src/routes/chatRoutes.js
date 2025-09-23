import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as chatController from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protectRoute, chatController.getAllChats);
router.get("/:chatId/messages", protectRoute, chatController.getMessagesByChatId); 

router.post("/", protectRoute, chatController.createChat);
router.post("/:chatId/participants", protectRoute, chatController.addParticipantsToChat);

router.delete("/:chatId", protectRoute, chatController.deleteGroupChat);
router.delete("/:chatId/participants/me", protectRoute, chatController.leaveGroupChat);
router.delete("/:chatId/participant", protectRoute, chatController.kickUsersFromGroupChat);
//router.delete("/:chatId/messages", protectRoute, chatController.deleteAllMessagesInChat);  // Delete All Messages in Chat
router.delete("/:chatId/messages/selected-messages", protectRoute, chatController.deletSelectedMessages);


export default router;