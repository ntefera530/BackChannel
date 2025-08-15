import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllFriends, addFriend, deleteFriend } from "../controllers/friendController.js";


const router = express.Router();

// router.get("/me", protectRoute, getAllFriends);
// router.post("/me/:friendId", protectRoute, addFriend);     //logic to add multple friends at a time?
// router.delete("/me/:friendId", protectRoute, deleteFriend);

router.get("/me", protectRoute, getAllFriends);
router.post("/me/:friendUsername", protectRoute, addFriend);     //logic to add multple friends at a time?
router.delete("/me/:friendUsername", protectRoute, deleteFriend);

export default router;