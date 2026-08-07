import express from "express";
import { register, login, getCurrentUser } from "../controllers/AuthController.js";
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", userAuth, getCurrentUser);

export default authRouter;