import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/me/settings", protectRoute, userController.getUserDeleteSettings);
router.put("/me/settings", protectRoute, userController.updateUserDeleteSettings);

router.put("/me/username", protectRoute, userController.updateUsername);
router.put("/me/password", protectRoute, userController.updatePassword);
router.put("/me/profilePicture", protectRoute, userController.updateProfilePicture);

router.put("/me/bio",protectRoute, userController.updateProfilePicture);


router.delete("/me", protectRoute, userController.deleteUserProfile);
router.delete("/me/messages", protectRoute, userController.deleteAllUserMessages);

export default router;