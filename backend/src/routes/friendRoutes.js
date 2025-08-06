import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllFriends, addFriend, deleteFriend } from "../controllers/friendController.js";


const router = express.Router();

//TODO Protect all of these

// router.get("/", protectRoute, getAllFriends);
// router.post("/:id", protectRoute, addFriend);     //logic to add multple friends at a time?
// router.delete("/:id", protectRoute,deleteFriend);

//Unprotected for Testing
router.get("/", getAllFriends);
router.post("/:id", addFriend);     //logic to add multple friends at a time?
router.delete("/:id", deleteFriend);


export default router;