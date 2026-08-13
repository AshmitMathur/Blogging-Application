import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        req.userId = null;
        req.role = null;
        req.user = null;

        return next();
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

    } catch (error) { req.userId = null;
        req.role = null;
        req.user = null;

        next();
    }
};

export default optionalAuth;