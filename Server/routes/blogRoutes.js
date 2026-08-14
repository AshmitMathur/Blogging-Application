import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish, updateBlog, getMyBlogs } from '../controllers/BlogController.js';
import upload from '../middlewares/multer.js';
import auth from '../middlewares/Auth.js';
import userAuth from "../middlewares/userAuth.js"
import anyAuth from '../middlewares/anyauth.js';
import OptAuth from '../middlewares/Optional.js'
import { toggleLike , getLikeInfo } from '../controllers/likeController.js';

const blogRouter = express.Router();

blogRouter.post("/add", anyAuth,  upload.single('image'), addBlog);
blogRouter.put("/update/:blogId", anyAuth, upload.single("image"), updateBlog);
blogRouter.post("/like/:blogId", userAuth, toggleLike);
blogRouter.get("/like/:blogId", OptAuth, getLikeInfo);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/my-blogs", userAuth, getMyBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", anyAuth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", OptAuth, addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", anyAuth, generateContent);


export default blogRouter;