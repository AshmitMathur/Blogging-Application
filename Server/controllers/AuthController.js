import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import googleClient from "../configs/google.js";

export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required",
            });
        }

        const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.json({
                success: false,
                message:
                    "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character",
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

export const googleLogin = async (req, res) => {
    try {
        const authUrl = googleClient.generateAuthUrl({
            access_type: "offline",
            scope: [
                "openid",
                "email",
                "profile",
            ],
            prompt: "select_account",
        });

        res.redirect(authUrl);

    } catch (error) {
        console.error("Google Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to start Google authentication",
        });
    }
};


export const googleCallback = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).send("Google authentication failed");
        }
        const { tokens } = await googleClient.getToken(code);

        if (!tokens.id_token) {
            return res.status(400).send("Google authentication failed");
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const {
            sub: googleId,
            name,
            email,
            picture,
        } = payload;
        if (!googleId || !email) {
            return res.status(400).send("Google account information is incomplete");
        }
        let user = await User.findOne({ googleId });
        if (!user) {
            user = await User.findOne({ email });
        }
        if (user) {
            if (!user.googleId) {
                user.googleId = googleId;
            }
            if (!user.avatar && picture) {
                user.avatar = picture;
            }
            await user.save();

        } else {
            let baseUsername = name
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");

            if (!baseUsername) {
                baseUsername = "user";
            }
            let username = baseUsername;
            let counter = 1;
            while (await User.findOne({ username })) {
                username = `${baseUsername}${counter}`;
                counter++;
            }
            user = await User.create({
                name,
                username,
                email,
                password: null,
                googleId,
                avatar: picture || "",
                role: "user",
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                role: "user",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        res.redirect(
            `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
        );
    } catch (error) {
        console.error("Google Callback Error:", error);
        res.redirect(
            `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
        );
    }
};