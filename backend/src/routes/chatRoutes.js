import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllChats, createChat, deleteChat, leaveChat, inviteToChat, kickFromChat} from "../controllers/chatController.js";


const router = express.Router();

router.get("/me", protectRoute, getAllChats);
router.post("/me", protectRoute, createChat);
router.delete("/me/:chatId", protectRoute, deleteChat);
router.delete("/me/:chatId/participant/me", protectRoute, leaveChat);
router.delete("/me/:chatId/participant/:userId", protectRoute, kickFromChat);
router.post("/me/:chatId/:userId", protectRoute, inviteToChat);

//router.get("/me", getAllChats);
// router.post("/me", createChat);
// router.delete("/me/:chatId", deleteChat);
// router.delete("/me/:chatId/participant/me", leaveChat);
// router.delete("/me/:chatId/participant/:userId", kickFromChat);
// router.post("/me/:chatId/:userId", inviteToChat);

export default router;