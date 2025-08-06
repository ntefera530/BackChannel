import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllGroups, addGroup, deleteGroup} from "../controllers/groupController.js";


const router = express.Router();

//TODO Protect all of these

// router.get("/", protectRoute, getAllGroups);
// router.post("/", protectRoute, addGroup);
// router.delete("/:id", protectRoute, deleteGroup);

//Unprotected for testing
router.get("/", getAllGroups);
router.post("/", addGroup);
router.delete("/:id", deleteGroup);



export default router;