import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js';
import User from "../models/User.js"
import Like from '../models/Like.js';

export const addBlog = async (req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, 
                {format: 'webp'}, 
                {width: '1280'} 
            ]
        });

        const image = optimizedImageUrl;

 const blogData = { title, subTitle, description, category, image: optimizedImageUrl, isPublished
        };
        if (req.role === "user") {
            blogData.author = req.userId;
        }

        await Blog.create(blogData);

                res.json({
            success: true,
            message: "Blog Added Successfully"
        });


    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogs = async(req, res)=> {
    try {
        const blogs = await Blog.find({ isPublished: true })
        .populate("author", "name username avatar");

                const blogsWithLikes = await Promise.all(
            blogs.map(async (blog) => {
                const likeCount = await Like.countDocuments({
                    blog: blog._id
                });

                return {
                    ...blog.toObject(),
                    likeCount
                };
            })
        );

        res.json({success: true, blogs: blogsWithLikes})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async(req, res) =>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        .populate("author", "name username avatar");

        if(!blog){
            return res.json({success: false, message: "Blog Not Found"})
        }
        res.json({success: true, blog})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteBlogById = async(req, res) =>{
    try {
        const {id} = req.body;
    const blog = await Blog.findById(id);

if (!blog) {
    return res.json({
        success: false,
        message: "Blog not found",
    });
}

if ( req.role !== "admin" && blog.author && blog.author.toString() !== req.userId
) {
    return res.json({
        success: false,
        message: "You are not authorized to delete this blog",
    });
}

        await Comment.deleteMany({blog: id});
        await Like.deleteMany({blog: id});
        await Blog.findByIdAndDelete(id);
        res.json({success: true, message: "Blog Deleted Successfully"})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const togglePublish = async(req, res) => {
    try {
        const{id} = req.body;
        const blog = await Blog.findById(id);

        if (!blog) {
    return res.json({
        success: false,
        message: "Blog not found",
    });
}

        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog Status Updated"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        if (!blogId || !content) {
            return res.json({
                success: false,
                message: "Comment content is required"
            });
        }
        let commentName = name;
        let userId = null;
        if (req.role === "user" && req.userId) {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found"
                });
            }
            userId = user._id;
            commentName = user.name;
        }
        if (req.role === "admin") {
            commentName = "Admin";
        }
        if (!req.role) {
            if (!name) {
                return res.json({
                    success: false,
                    message: "Name is required"
                });
            }
        }
        await Comment.create({
            blog: blogId,
            user: userId,
            name: commentName,
            content
        });
        res.json({
            success: true,
            message: "Comment added for review"
        });
    } catch (error) {
        console.error("Add Comment Error:", error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getBlogComments = async(req, res) =>{
    try {
         const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({
    success: true,
    comments: comments
});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async(req, res) => {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + " Generate a blog content for this topic in simple text format")
        res.json({success: true, content});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const { title, subTitle, description, category, isPublished } =
            JSON.parse(req.body.blog);

        const imageFile = req.file;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.json({
                success: false,
                message: "Blog not found"
            });
        }

        if (blog.author && blog.author.toString() !== req.userId) {
    return res.json({
        success: false,
        message: "You are not authorized to edit this blog",
    });
}


        if (!title || !description || !category) {
    return res.json({
        success: false,
        message: "Missing required fields",
    });
}

        blog.title = title;
        blog.subTitle = subTitle;
        blog.description = description;
        blog.category = category;
        blog.isPublished = isPublished;

        if (imageFile) {
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "1280" },
        ],
    });

    blog.image = optimizedImageUrl;
}

await blog.save();

res.json({
    success: true,
    message: "Blog Updated Successfully",
});

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getMyBlogs = async(req, res) => {
    try {
            const blogs = await Blog.find({
            author: req.userId,
        }).populate("author", "name username avatar");

        res.json({
            success: true,
            blogs,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}