import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as friendController from "../controllers/friendController.js";

const router = express.Router();

router.get("/me", protectRoute, friendController.getAllFriends);
router.post("/me", protectRoute, friendController.addFriend);
router.delete("/me", protectRoute, friendController.deleteFriend);

export default router;