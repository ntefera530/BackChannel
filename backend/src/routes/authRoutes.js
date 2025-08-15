import express from "express";

import { signup, login, logout, authenticate } from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",  logout);
router.post("/me",  protectRoute, authenticate);

export default router;