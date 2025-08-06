import express from "express";
import protectRoute from "../middleware/protectRoute.js";

import { getFreindsList, getGroups, addFriend, addGroup } from "../controllers/userController.js";

const router = express.Router();

//TODO Protect all of these

router.get("/friends", protectRoute, getFreindsList);
router.get("/groups", protectRoute, getGroups);

router.post("/friends/:friendId", protectRoute, addFriend);
router.post("/group", protectRoute, addGroup);

export default router;