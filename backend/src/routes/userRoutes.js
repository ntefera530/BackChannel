import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/:username", userController.getUserProfile);
//router.get("/me/messages", userController.getAllUserMessages);


router.put("/me/username", protectRoute, userController.updateUsername);
router.put("/me/password", protectRoute, userController.updatePassword);
router.put("/me/profile-picture",protectRoute, userController.updateProfilePicture);
router.put("/me/bio",protectRoute, userController.updateProfilePicture);


router.delete("/me", protectRoute, userController.deleteUserProfile);
//router.delete("/me/messages", protectRoute, userController.deleteAllUserMessages);

export default router;