import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../../Assets/assets";
import { useAppContext } from "../../../../context/AppContext";
import { useTheme } from "../../../../context/ThemeContext";

const Navbar = () => {

    const {
        user,
        isAdmin,
        logout
    } = useAppContext();
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className="sticky top-0 z-50
        bg-white/85 dark:bg-gray-950/85
        backdrop-blur-xl
        border-b border-gray-200/70 dark:border-gray-800
        shadow-sm">
            <div className="max-w-7xl mx-auto
            flex items-center justify-between
            px-5 sm:px-8 lg:px-10
            h-18">
 {/* ================= LOGO + NAVIGATION ================= */}
<div className="flex items-center">

    {/* Logo */}
    <Link
        to="/"
        className="flex items-center shrink-0"
    >
        <img
            src={assets.logo}
            alt="Logo"
            className="
                w-32 sm:w-40
                cursor-pointer
                transition-transform duration-200
                hover:scale-[1.02]
                dark:invert
            "
        />
    </Link>

    {/* Navigation Links */}
    <div className="hidden md:flex items-center gap-2 ml-6">

        <Link
            to="/"
            className="
                px-4 py-2
                text-sm font-medium
                text-gray-700 dark:text-gray-300
                rounded-lg
                hover:text-primary
                hover:bg-primary/5
                dark:hover:bg-primary/10
                transition-all duration-200
            "
        >
            Home
        </Link>

        {user && !isAdmin && (
            <Link
                to="/write"
                className="
                    px-4 py-2
                    text-sm font-medium
                    text-gray-700 dark:text-gray-300
                    rounded-lg
                    hover:text-primary 
                    hover:bg-primary/5
                    dark:hover:bg-primary/10
                    transition-all duration-200
                "
            >
                Write
            </Link>
        )}

    </div>

</div>
                {/* ================= RIGHT SECTION ================= */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* ---------- LOGGED OUT ---------- */}
                    {!user && !isAdmin && (
                        <>
                            <Link
                                to="/login"
                                className="hidden sm:block
                                px-4 py-2
                                text-sm font-medium
                                text-gray-700 dark:text-gray-200
                                border border-gray-300
                                dark:border-gray-700
                                rounded-lg
                                hover:bg-gray-100
                                dark:hover:bg-gray-800
                                hover:border-gray-400
                                dark:hover:border-gray-600
                                transition-all duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 sm:px-5 py-2
                                text-sm font-medium
                                text-white
                                bg-primary
                                rounded-lg
                                shadow-sm
                                hover:bg-primary/90
                                hover:shadow-md
                                transition-all duration-200"
                            >
                                <span className="hidden sm:inline">
                                    Register
                                </span>
                                <span className="sm:hidden">
                                    Sign up
                                </span>
                            </Link>
                            <Link
                                to="/admin"
                                className="hidden lg:block
                                px-4 py-2
                                text-sm font-medium
                                text-primary
                                border border-primary/30
                                rounded-lg
                                hover:bg-primary/10
                                transition-all duration-200"
                            >
                                Admin Login
                            </Link>
                        </>
                    )}
                    {/* ---------- NORMAL USER ---------- */}
                    {user && !isAdmin && (
                        <div className="relative group">

                            {/* Avatar */}
                            <button
                                className="flex items-center gap-2
                                p-1
                                rounded-full
                                hover:bg-gray-100
                                dark:hover:bg-gray-800
                                transition-all duration-200"
                            >

                                <img
                                    src={
                                        user.avatar ||
                                        assets.user_icon
                                    }
                                    alt={user.name}
                                    className="w-10 h-10
                                    rounded-full
                                    object-cover
                                    border-2
                                    border-primary/20
                                    group-hover:border-primary/50
                                    transition-all duration-200"
                                />

                                <span className="hidden lg:block
                                max-w-24 truncate
                                text-sm font-medium
                                text-gray-700 dark:text-gray-200">
                                    {user.name}
                                </span>

                                <span className="hidden lg:block
                                text-xs text-gray-400
                                group-hover:rotate-180
                                transition-transform duration-200">
                                    ▼
                                </span>
                            </button>
                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-3
                            w-56
                            bg-white dark:bg-gray-900
                            border border-gray-200 dark:border-gray-800
                            rounded-xl
                            shadow-xl
                            overflow-hidden
                            opacity-0 invisible
                            translate-y-2
                            group-hover:opacity-100
                            group-hover:visible
                            group-hover:translate-y-0
                            transition-all duration-200">
                                {/* User Info */}
                                <div className="px-4 py-3
                                border-b border-gray-100
                                dark:border-gray-800">

                                    <p className="text-sm font-semibold
                                    text-gray-900 dark:text-white
                                    truncate">
                                        {user.name}
                                    </p>

                                    <p className="text-xs
                                    text-gray-500 dark:text-gray-400
                                    truncate">
                                        @{user.username}
                                    </p>

                                </div>


                                {/* Profile */}
                                <Link
                                    to={`/profile/${user.username}`}
                                    className="flex items-center gap-3
                                    px-4 py-3
                                    text-sm
                                    text-gray-700 dark:text-gray-200
                                    hover:bg-gray-100
                                    dark:hover:bg-gray-800
                                    hover:text-primary
                                    transition-colors duration-150"
                                >
                                    <span>👤</span>
                                    <span>Profile</span>
                                </Link>


                                {/* Logout */}
                                <button
                                    onClick={logout}
                                    className="w-full
                                    flex items-center gap-3
                                    px-4 py-3
                                    text-sm text-left
                                    text-red-500
                                    hover:bg-red-50
                                    dark:hover:bg-red-950/30
                                    transition-colors duration-150"
                                >
                                    <span>↪</span>
                                    <span>Logout</span>
                                </button>

                            </div>

                        </div>
                    )}


                    {/* ---------- ADMIN ---------- */}
                    {isAdmin && (
                        <>
                            <Link
                                to="/admin"
                                className="px-4 sm:px-5 py-2
                                text-sm font-medium
                                text-white
                                bg-primary
                                rounded-lg
                                shadow-sm
                                hover:bg-primary/90
                                hover:shadow-md
                                transition-all duration-200"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={logout}
                                className="hidden sm:block
                                px-4 py-2
                                text-sm font-medium
                                text-white
                                bg-red-500
                                rounded-lg
                                hover:bg-red-600
                                shadow-sm
                                transition-all duration-200"
                            >
                                Logout
                            </button>
                        </>
                    )}


                    {/* ---------- THEME ---------- */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="w-10 h-10
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

                </div>

            </div>

        </nav>
    );
};

export default Navbar;
