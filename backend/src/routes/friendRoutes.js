import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as friendController from "../controllers/friendController.js";

const router = express.Router();

// Get 
router.get("/me", protectRoute, friendController.getAllFriends);

// Post 
router.post("/me/:friendUsername", protectRoute, friendController.addFriend);     //logic to add multple friends at a time?

// Delete
router.delete("/me/:friendUsername", protectRoute, friendController.deleteFriend);

export default router;