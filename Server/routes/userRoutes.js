import express from "express";
import { getUserProfile, updateProfile  } from "../controllers/UserController.js"
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.put("/update", userAuth, updateProfile);
userRouter.get("/:username", getUserProfile);

export default userRouter;