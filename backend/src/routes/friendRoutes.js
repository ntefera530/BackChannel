import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as friendController from "../controllers/friendController.js";

const router = express.Router();

router.get("/", protectRoute, friendController.getAllFriends);
router.post("/", protectRoute, friendController.addFriend);
router.delete("/:friendId", protectRoute, friendController.deleteFriend);

export default router;