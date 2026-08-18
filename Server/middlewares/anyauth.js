import jwt from "jsonwebtoken";

const anyAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (
            !decoded.role ||
            !["user", "admin"].includes(decoded.role)
        ) {
            return res.status(403).json({
                success: false,
                message: "Invalid user role"
            });
        }

        req.user = decoded;
        req.userId = decoded.id || null;
        req.role = decoded.role;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default anyAuth;