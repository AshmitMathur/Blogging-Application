import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({
            success: false,
            message: "Admin authentication required"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.json({
                success: false,
                message: "Access denied. Admin only."
            });
        }

        req.adminEmail = decoded.email;

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid Token"
        });
    }
};

export default auth;