import Newsletter from "../models/NewsLetter.js";

export const getAllNewsletterSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find()
            .sort({ subscribedAt: -1 });

        return res.json({
            success: true,
            subscribers,
        });

    } catch (error) {
        console.error("Get Newsletter Subscribers Error:", error);

        return res.json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteNewsletterSubscriber = async (req, res) => {
    try {
        const { id } = req.params;

        const subscriber = await Newsletter.findById(id);

        if (!subscriber) {
            return res.json({
                success: false,
                message: "Subscriber not found",
            });
        }

        await Newsletter.findByIdAndDelete(id);

        return res.json({
            success: true,
            message: "Subscriber removed successfully",
        });

    } catch (error) {
        console.error("Delete Newsletter Subscriber Error:", error);

        return res.json({
            success: false,
            message: error.message,
        });
    }
};