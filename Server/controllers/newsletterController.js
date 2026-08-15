import Newsletter from "../models/NewsLetter.js";

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({
                success: false,
                message: "Email is required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email address",
            });
        }

        const existingSubscriber = await Newsletter.findOne({ email });

        if (existingSubscriber) {
            return res.json({
                success: false,
                message: "You are already subscribed",
            });
        }

        await Newsletter.create({ email });

        return res.json({
            success: true,
            message: "Successfully subscribed to the newsletter",
        });

    } catch (error) {
        console.error("Newsletter Subscription Error:", error);

        return res.json({
            success: false,
            message: error.message,
        });
    }
};