import jwt from "jsonwebtoken";

const userAuth = async(req, res, next) => {
    try{
    const token = req.headers.authorization;

    if(!token){
        return res.json({
            success: false,
            message: "UnAuthorized. Please Login",
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
    }catch(error){
        console.log("JWT Error:", error);
        return res.json({
            success: false,
            message: "Invalid Token",
        })
    }
};

export default userAuth;