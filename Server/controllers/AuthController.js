import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.json({
                success: false,
                message: "Email already exists",
            });
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.json({
                success: false,
                message: "Username already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, username, email, password: hashedPassword,
        });

const token = jwt.sign(
    {
        id: user._id,
        role: "user"
    },
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
);

        res.json({
    success: true,
    message: "Registration successful",
    token,
    user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
    },
});


    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            user,
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({
                success: false,
                message: "Email and Password are required",
            });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

const token = jwt.sign(
    {
        id: user._id,
        role: "user"
    },
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
);

        res.json({
    success: true,
    message: "Login successful",
    token,
    user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
    },
});

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }

    
};