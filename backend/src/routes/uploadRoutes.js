import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as uploadController from "../controllers/uploadController.js";

const router = express.Router();

router.get("/upload-url", protectRoute, uploadController.getUploadUrl);
router.get("/download-url", protectRoute, uploadController.getDownloadUrl);

export default router;