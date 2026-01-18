import express from "express";
import { userAuthMiddelware } from "../middlewares/auth.meddleware.js";
import { generateCaption, getAllCaption } from "../controllers/caption.controllers.js";

const router = express.Router();

router.post("/generate", userAuthMiddelware, generateCaption);
router.post("/captions", getAllCaption);


export default router;