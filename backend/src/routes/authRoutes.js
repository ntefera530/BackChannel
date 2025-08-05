import express from "express";
import protectRoute from "../middleware/protectRoute.js";

import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.get("/signup", signup);
router.get("/login", login);
router.get("/logout",  logout);


export default router;