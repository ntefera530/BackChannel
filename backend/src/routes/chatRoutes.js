import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllChats, createChat, deleteChat, leaveChat, inviteToChat, kickFromChat} from "../controllers/chatController.js";


const router = express.Router();

router.get("/me", protectRoute, getAllChats);
router.post("/me", protectRoute, createChat);
router.delete("/me/:id", protectRoute, deleteChat);
router.delete("/:chatId/participant/:userId/me", protectRoute, leaveChat);
router.delete("/:chatId/participant/:userId", protectRoute, kickFromChat);
router.post("/me/:id", protectRoute, inviteToChat);

export default router;