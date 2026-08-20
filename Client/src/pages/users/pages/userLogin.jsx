import React, { useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";
import { useTheme } from "../../../../context/ThemeContext";
import { assets } from "../../../Assets/assets";

const UserLogin = () => {
    const {
        axios,
        navigate,
        setToken,
        setUser,
        fetchCurrentUser,
        fetchMyBlogs
    } = useAppContext();

    const {theme, toggleTheme} = useTheme();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "/api/auth/login",
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
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-5">
            <img
    onClick={() => navigate('/')}
    src={assets.logo}
    alt="logo"
    className="absolute top-5 left-5 cursor-pointer text-xl w-32 sm:w-44  dark:invert"
/>
            <button
    onClick={toggleTheme}
    className="absolute top-5 right-5 cursor-pointer text-xl
     flex items-center justify-center rounded-full text-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:scale-105"
>
    {theme === "light" ? "🌙" : "☀️"}
</button>
            <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl shadow">
                <h1 className="text-3xl font-bold text-center dark:text-white">
                    Login
                </h1>
                <p className="text-center text-gray-500 mt-2 mb-8">
                    Welcome back!
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <label className="block mb-2 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 dark:text-gray-300">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white rounded-lg cursor-pointer hover:opacity-90"
                    >
                        Login
                    </button>
                    <div className="flex items-center gap-3 my-5">
    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

    <span className="text-sm text-gray-500 dark:text-gray-400">
        OR
    </span>

    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
</div>

<button
    type="button"
    onClick={() => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/api/auth/google`;
    }}
    className="w-full py-3 border border-gray-300 dark:border-gray-700
               bg-white dark:bg-gray-800
               text-gray-700 dark:text-gray-200
               rounded-lg cursor-pointer
               hover:bg-gray-50 dark:hover:bg-gray-700
               transition flex items-center justify-center gap-3"
>
    <span className="text-lg">G</span>
    Continue with Google
</button>

                </form>

                <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
                    New user?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-primary cursor-pointer font-medium"
                    >
                        Register here
                    </span>
                </p>

            </div>
        </div>
    );
};

export default UserLogin;