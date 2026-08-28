import Bookmark from "../models/Bookmark.js";
import Blog from "../models/Blog.js";
import Like from "../models/Like.js";

export const toggleBookmark = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.json({
                success: false,
                message: "Blog not found",
            });
        }

        if (!blog.isPublished) {
            return res.json({
                success: false,
                message: "Cannot bookmark an unpublished blog",
            });
        }

        const existingBookmark = await Bookmark.findOne({
            user: req.userId,
            blog: blogId,
        });

        if (existingBookmark) {
            await Bookmark.findByIdAndDelete(existingBookmark._id);

            return res.json({
                success: true,
                bookmarked: false,
                message: "Bookmark removed",
            });
        }

        await Bookmark.create({
            user: req.userId,
            blog: blogId,
        });

        return res.json({
            success: true,
            bookmarked: true,
            message: "Blog bookmarked",
        });

    } catch (error) {
        console.log("Toggle Bookmark Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const getBookmarkStatus = async (req, res) => {
    try {
        const { blogId } = req.params;

        const bookmark = await Bookmark.findOne({
            user: req.userId,
            blog: blogId,
        });

        res.json({
            success: true,
            bookmarked: !!bookmark,
        });

    } catch (error) {
        console.log("Get Bookmark Status Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};


export const getMyBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({
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

        const validBookmarks = bookmarks.filter(
            (bookmark) => bookmark.blog
        );

        const bookmarksWithLikes = await Promise.all(
            validBookmarks.map(async (bookmark) => {
                const likeCount = await Like.countDocuments({
                    blog: bookmark.blog._id,
                });

                return {
                    ...bookmark.toObject(),
                    blog: {
                        ...bookmark.blog.toObject(),
                        likeCount,
                    },
                };
            })
        );

        res.json({
            success: true,
            bookmarks: bookmarksWithLikes,
        });

    } catch (error) {
        console.log("Get My Bookmarks Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};