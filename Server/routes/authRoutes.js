import express from "express";
import { register, login, getCurrentUser, googleLogin, googleCallback } from "../controllers/AuthController.js";
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", userAuth, getCurrentUser);
authRouter.get("/google", googleLogin);
authRouter.get("/google/callback", googleCallback);

export default authRouter;