import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/me/deletion-settings",    protectRoute, userController.getDeletionSettings);
router.get("/:userId/profile-picture", protectRoute, userController.getProfilePictureUrl);
//router.get("/:userId",                 userController.getUserProfile);

router.put("/me/deletion-settings",  protectRoute, userController.updateDeletionSettings);
router.put("/me/username",           protectRoute, userController.updateUsername);
router.put("/me/password",           protectRoute, userController.updatePassword);
router.put("/me/profile-picture",    protectRoute, userController.updateProfilePictureUrl);
router.put("/me/bio",                protectRoute, userController.updateBio);

router.delete("/me",          protectRoute, userController.deleteAccount);
router.delete("/me/messages", protectRoute, userController.deleteAllMessagesFromUser);

export default router;