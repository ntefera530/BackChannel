import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { requireChatParticipant, requireChatOwner, requireMessageOwner } from "../middleware/chatAuth.js";
import * as chatController from "../controllers/chatController.js";

const router = express.Router();

//router.get("/",                     protectRoute, chatController.getAllChats);
router.get("/group-chats",          protectRoute, chatController.getGroupChatsForUser);
router.get("/direct-messages",      protectRoute, chatController.getDirectMessagesForUser);
router.get("/:chatId/messages",     protectRoute, requireChatParticipant, chatController.getChatMessages); 
router.get("/:chatId/participants", protectRoute, requireChatParticipant, chatController.getChatParticipants);


router.post("/group-chats",                  protectRoute, chatController.createGroupChat);
router.post("/direct-messages",              protectRoute, chatController.createDirectMessage);
router.post("/:chatId/participants/:userId", protectRoute, requireChatOwner, chatController.addUserToGroupChat);
router.post("/:chatId/participants",         protectRoute, requireChatOwner, chatController.addUsersToGroupChat);

router.put("/:chatId/picture",               protectRoute, requireChatOwner, chatController.updateGroupChatPicture);
router.put("/:chatId/picture",               protectRoute, requireChatOwner, chatController.updateGroupChatPicture);
router.put("/:chatId/owner",                 protectRoute, requireChatOwner, chatController.transferChatOwnership);

router.delete("/direct-messages/:chatId",      protectRoute, requireChatParticipant, chatController.deleteDirectMessage);
router.delete("/group-chats/:chatId",          protectRoute, requireChatOwner, chatController.deleteGroupChat);
router.delete("/:chatId/participants/me",      protectRoute, requireChatParticipant, chatController.leaveGroupChat);
router.delete("/:chatId/participants/:userId", protectRoute, requireChatOwner, chatController.kickUserFromGroupChat);

router.delete("/:chatId/messages/me",         protectRoute, chatController.deleteUserChatMessages);
router.delete("/:chatId/messages/:messageId", protectRoute, requireMessageOwner, chatController.deleteChatMessage);

export default router;