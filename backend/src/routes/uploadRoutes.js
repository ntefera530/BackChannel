import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import * as uploadController from "../controllers/uploadController.js";

const router = express.Router();

router.get("/profile/upload-url", protectRoute, uploadController.getProfileUploadUrl);
router.get("/profile/download-url", protectRoute, uploadController.getProfileDownloadUrl);

export default router;