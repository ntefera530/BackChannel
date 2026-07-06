import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { requireParticipant, requireOwner }from "../middleware/chatAuth.js";
import * as chatController from "../controllers/chatController.js";

const router = express.Router();

router.get("/",                     protectRoute, chatController.getAllChats);
router.get("/:chatId/messages",     protectRoute, chatController.getMessagesByChatId); 
router.get("/:chatId/participants", protectRoute, chatController.getParticipantsByChatId);

//change URL when front end is ready to send the correct URL
router.post("/",               protectRoute, chatController.createGroupChat);
router.post("/direct-message", protectRoute, chatController.createDirectMessage);

router.post("/:chatId/participants", protectRoute, requireOwner, chatController.addParticipantsToGroupChat);

router.delete("/direct-message/:chatId",             protectRoute, chatController.deleteDirectMessage);
router.delete("/:chatId",                            protectRoute, requireOwner, chatController.deleteGroupChat);
router.delete("/:chatId/participants/me",            protectRoute, requireParticipant, chatController.leaveGroupChat);
router.delete("/:chatId/participant",                protectRoute, requireOwner, chatController.kickUsersFromGroupChat);


//Admin, users cant do
router.delete("/:chatId/messages/me",                protectRoute, chatController.deleteUserMessagesByChatId);  // Delete All Messages in Chat
router.delete("/:chatId/messages/selected-messages", protectRoute, chatController.deleteUserSelectedMessages);

export default router;