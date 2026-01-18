import express from "express";
import { deductCredits, login, loginAndRegisterWithGoogle, logout, profile, register } from "../controllers/user.controller.js";
import { userAuthMiddelware } from "../middlewares/auth.meddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/loginAndRegisterWithGoogle", loginAndRegisterWithGoogle);
router.get("/profile", userAuthMiddelware, profile);
router.get("/logout", userAuthMiddelware, logout);
router.post("/deduct-credits", deductCredits);

export default router;