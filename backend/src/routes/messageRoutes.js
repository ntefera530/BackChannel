import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages } from "../controllers/messageController.js";


const router = express.Router();

//TODO Protect all of these

//get messages + pagination
router.get("/messages/:chatId", protectRoute, getMessages);


export default router;