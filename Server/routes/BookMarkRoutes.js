import express from "express";
import {
    toggleBookmark,
    getBookmarkStatus,
    getMyBookmarks,
} from "../controllers/BookMarkController.js";

import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/:blogId", userAuth, toggleBookmark);

router.get("/status/:blogId", userAuth, getBookmarkStatus);

router.get("/my", userAuth, getMyBookmarks);

export default router;