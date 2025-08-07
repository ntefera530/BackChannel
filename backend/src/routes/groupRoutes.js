import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllGroups, createGroup, deleteGroup, leaveGroup, inviteToGroup, kickFromGroup} from "../controllers/groupController.js";


const router = express.Router();

//TODO Protect all of these

// router.get("/", protectRoute, getAllGroups);
// router.post("/", protectRoute, addGroup);
// router.delete("/:id", protectRoute, deleteGroup);

//Unprotected for testing
router.get("/", getAllGroups);
router.post("/", createGroup);
router.delete("/:id", deleteGroup);
router.delete("/:id", leaveGroup);
router.delete("/:id", kickFromGroup);
router.post("/:id", inviteToGroup);


export default router;