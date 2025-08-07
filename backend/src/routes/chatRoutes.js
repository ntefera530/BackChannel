import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllChats, createChat, deleteChat, leaveChat, inviteToChat, kickFromChat} from "../controllers/chatController.js";


const router = express.Router();

//TODO Protect all of these

// router.get("/", protectRoute, getAllGroups);
// router.post("/", protectRoute, addGroup);
// router.delete("/:id", protectRoute, deleteGroup);

//Unprotected for testing
router.get("/", getAllChats);
router.post("/", createChat);
router.delete("/:id", deleteChat);
router.delete("/:id", leaveChat);
router.delete("/:id", kickFromChat);
router.post("/:id", inviteToChat);


export default router;