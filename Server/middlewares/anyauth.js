import jwt from "jsonwebtoken";

const anyAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({
            success: false,
            message: "Authentication required"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        req.userId = decoded.id || null;
        req.role = decoded.role || null;

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default anyAuth;