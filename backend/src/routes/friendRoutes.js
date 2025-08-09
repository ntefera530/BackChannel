import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllFriends, addFriend, deleteFriend } from "../controllers/friendController.js";


const router = express.Router();

router.get("/me", protectRoute, getAllFriends);
router.post("/me/:friendId", protectRoute, addFriend);     //logic to add multple friends at a time?
router.delete("/me/:friendId", protectRoute, deleteFriend);

export default router;