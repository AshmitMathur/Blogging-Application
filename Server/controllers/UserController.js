import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Like from "../models/Like.js";

export const updateProfile = async (req, res) => {
    try {
        const { name, bio, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                name,
                bio,
                avatar
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        const blogs = await Blog.find({
            author: user._id,
            isPublished: true,
        })
            .populate("author", "name username avatar")
            .sort({ createdAt: -1 });

        const blogsWithLikes = await Promise.all(
            blogs.map(async (blog) => {
                const likeCount = await Like.countDocuments({
                    blog: blog._id,
                });

                return {
                    ...blog.toObject(),
                    likeCount,
                };
            })
        );

        res.json({
            success: true,
            user,
            blogs: blogsWithLikes,
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};