import User from "../models/User.js";
import Blog from "../models/Blog.js";

export const updateProfile = async (req, res) => {
    try {

        const { name, bio, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                name, bio, avatar
            },
            { returnDocument:"after" }
        );

        res.json({
            success: true,
            user
        });

    } catch(error) {
        res.json({
            success:false,
            message:error.message
        });
    }
}

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
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            user,
            blogs,
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};