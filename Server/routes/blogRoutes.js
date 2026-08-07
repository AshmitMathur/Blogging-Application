import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish, updateBlog, getMyBlogs } from '../controllers/BlogController.js';
import upload from '../middlewares/multer.js';
import auth from '../middlewares/Auth.js';
import userAuth from "../middlewares/userAuth.js"

const blogRouter = express.Router();

blogRouter.post("/add", userAuth,  upload.single('image'), addBlog);
blogRouter.put("/update/:blogId", userAuth, upload.single("image"), updateBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/my-blogs", userAuth, getMyBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", userAuth, deleteBlogById);
blogRouter.post("/toggle-publish", userAuth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);


export default blogRouter;