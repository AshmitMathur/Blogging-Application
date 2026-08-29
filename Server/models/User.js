import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            sparse: true,
        },
        email: { type: String, required: true, unique: true,
        },
        password: { type: String, default: null,
        },
        googleId: { type: String, unique: true, sparse: true,
        },
        avatar: { type: String, default: "",
        },
        bio: { type: String, default: "",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user", }, },
    { timestamps: true, }
);
const User = mongoose.model("User", userSchema);
export default User;