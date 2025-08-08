import express from "express";
import protectRoute from "../middleware/protectRoute.js";

import { getUserProfile, updateUsername, updateProfilePicture,  deleteUserProfile} from "../controllers/userController.js";

const router = express.Router();

//TODO Protect all of these
// router.get("/", protectRoute, getAllGroups);
// router.post("/", protectRoute, addGroup);
// router.delete("/:id", protectRoute, deleteGroup);

//Unprotected for testing
router.get("/:username", getUserProfile);
router.put("/me/username", protectRoute, updateUsername);
router.put("/me/profile-picture",protectRoute, updateProfilePicture);
router.delete("/me", protectRoute, deleteUserProfile);

export default router;