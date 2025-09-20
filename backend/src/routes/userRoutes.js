import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// Get
router.get("/:username", userController.getUserProfile);

// Post or Put
router.put("/me/username", protectRoute, userController.updateUsername);
router.put("/me/profile-picture",protectRoute, userController.updateProfilePicture);

// Delete
router.delete("/me", protectRoute, userController.deleteUserProfile);

export default router;