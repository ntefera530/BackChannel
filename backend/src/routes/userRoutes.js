import express from "express";
import protectRoute from "../middleware/protectRoute.js";

import {  } from "../controllers/userController.js";

const router = express.Router();

//TODO Protect all of these
// router.get("/", protectRoute, getAllGroups);
// router.post("/", protectRoute, addGroup);
// router.delete("/:id", protectRoute, deleteGroup);

//Unprotected for testing
// router.get("/", getUserProfile);
// router.put("/", updateUsername);
// router.put("/", updateProfilePicture);
// router.delete("/", deleteUserProfile);

export default router;