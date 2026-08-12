import React, { useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";
import { useTheme } from "../../../../context/ThemeContext";
import { assets } from "../../../Assets/assets";

const Register = () => {
    const {
        axios,
        navigate,
        setToken,
        setUser,
        fetchCurrentUser,
        fetchMyBlogs,
    } = useAppContext();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const {theme, toggleTheme} = useTheme();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(
                "/api/auth/register",
                formData
            );
            if (data.success) {
                toast.success(data.message);

                localStorage.setItem("token", data.token);

                setToken(data.token);
                setUser(data.user);

                axios.defaults.headers.common["Authorization"] =
                    data.token;

                await fetchCurrentUser();
                await fetchMyBlogs();
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
                        <img
                onClick={() => navigate('/')}
                src={assets.logo}
                alt="logo"
                className="absolute top-5 left-5 cursor-pointer text-xl w-32 sm:w-44  dark:invert"
            />
    <button
    onClick={toggleTheme}
    className="absolute top-5 right-5 cursor-pointer text-xl                             
    flex items-center justify-center
                        rounded-full
                        text-lg
                        bg-gray-100
                        dark:bg-gray-800
                        hover:bg-gray-200
                        dark:hover:bg-gray-700
                        cursor-pointer
                        transition-all duration-200
                        hover:scale-105"
>
    {theme === "light" ? "🌙" : "☀️"}
</button>
            <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8">
                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
                    Create Account
                </h1>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
                    Register to start writing and sharing blogs
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            required
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-gray-700
                            dark:bg-gray-800 dark:text-gray-200
                            rounded-lg px-4 py-2.5 outline-none
                            focus:border-primary"
                        />
                    </div>
                    {/* Username */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                            Username
                        </label>
                        <input
                            name="username"
                            type="text"
                            placeholder="Choose a username"
                            value={formData.username}
                            required
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-gray-700
                            dark:bg-gray-800 dark:text-gray-200
                            rounded-lg px-4 py-2.5 outline-none
                            focus:border-primary"
                        />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-gray-700
                            dark:bg-gray-800 dark:text-gray-200
                            rounded-lg px-4 py-2.5 outline-none
                            focus:border-primary"
                        />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-gray-700
                            dark:bg-gray-800 dark:text-gray-200
                            rounded-lg px-4 py-2.5 outline-none
                            focus:border-primary"
                        />
                    </div>
                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-2.5 bg-primary
                        text-white rounded-lg font-medium
                        cursor-pointer hover:bg-primary/90
                        transition disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>
                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-primary font-medium cursor-pointer hover:underline"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;