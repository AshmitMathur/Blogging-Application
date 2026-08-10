import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../../Assets/assets";
import { useAppContext } from "../../../../context/AppContext";

const Navbar = () => {

    const { user, navigate, setToken, setUser } = useAppContext();

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link to="/">
                    <img
                        src={assets.logo}
                        alt="Logo"
                        className="w-32 sm:w-44 cursor-pointer dark:invert"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className="hover:text-primary transition"
                    >
                        Home
                    </Link>

                    {user && (
                        <Link
                            to="/write"
                            className="hover:text-primary transition"
                        >
                            Write
                        </Link>
                    )}
                </div>

                {/* Right Section */}
<div className="flex items-center gap-4">

    {!user ? (
        <>
            <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
                Login
            </Link>

            <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
            >
                Register
            </Link>
        </>
    ) : (
        <div className="relative group">

            <img
                src={user.avatar || assets.user_icon}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover cursor-pointer border"
            />

            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border dark:border-zinc-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

                <Link
                    to={`/profile/${user.username}`}
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                    Profile
                </Link>

<Link to={`/profile/${user.username}`}>
    My Profile
</Link>

                <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 text-red-500"
                >
                    Logout
                </button>

            </div>

        </div>
    )}

</div>

            </div>
        </nav>
    );
};

export default Navbar;