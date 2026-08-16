import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/admincontroller.js';
import auth from '../middlewares/Auth.js';
import {
    getAllNewsletterSubscribers,
    deleteNewsletterSubscriber
} from "../controllers/adminNewsletterController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin)
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.get("/newsletter", auth, getAllNewsletterSubscribers);
adminRouter.delete(
    "/newsletter/:id",
    auth,
    deleteNewsletterSubscriber
);

export default adminRouter;