import Like from "../models/Like.js";
import Blog from "../models/Blog.js";

export const toggleLike = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (!blog.isPublished) {
            return res.status(403).json({
                success: false,
                message: "You cannot like an unpublished blog",
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

const blog = await Blog.findById(blogId);

if (!blog) {
    return res.status(404).json({
        success: false,
        message: "Blog not found",
    });
}

if (!blog.isPublished) {
    return res.status(403).json({
        success: false,
        message: "Like information is not available for unpublished blogs",
    });
}

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

export const getMyLikedBlogs = async (req, res) => {
    try {
        const likes = await Like.find({
            user: req.userId,
        })
            .populate({
                path: "blog",
                populate: {
                    path: "author",
                    select: "name username avatar",
                },
            })
            .sort({ createdAt: -1 });

        const validLikes = likes.filter(
            (like) => like.blog && like.blog.isPublished
        );

        const blogsWithLikes = await Promise.all(
            validLikes.map(async (like) => {
                const blog = like.blog;

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
            blogs: blogsWithLikes,
        });

    } catch (error) {
        console.error("Get My Liked Blogs Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};