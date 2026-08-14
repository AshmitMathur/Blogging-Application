import Like from "../models/Like.js";
import Blog from "../models/Blog.js";

export const toggleLike = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.json({
                success: false,
                message: "Blog not found",
            });
        }

        const existingLike = await Like.findOne({
            user: req.userId,
            blog: blogId,
        });

        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);

            return res.json({
                success: true,
                liked: false,
                message: "Blog Unliked",
            });
        }

        await Like.create({
            user: req.userId,
            blog: blogId,
        });

        return res.json({
            success: true,
            liked: true,
            message: "Blog Liked",
        });

    } catch (error) {
        console.error("Toggle Like Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const getLikeInfo = async (req, res) => {
    try {
        const { blogId } = req.params;

        const likeCount = await Like.countDocuments({
            blog: blogId,
        });

        const userLiked = await Like.exists({
            blog: blogId,
            user: req.userId,
        });

        res.json({
            success: true,
            likeCount,
            liked: !!userLiked,
        });

    } catch (error) {
        console.error("Get Like Info Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};