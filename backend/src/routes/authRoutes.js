import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout",  authController.logout);
router.post("/me",  protectRoute, authController.authenticate);

export default router;