import React from 'react';
import { assets } from '../../Assets/assets';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../context/ThemeContext';

const Layout = () => {
    const { navigate, logout } = useAppContext();
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Navbar */}
            <div className=" flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950
            ">
                <img
                    src={assets.logo}
                    className="w-32 sm:w-40 cursor-pointer dark:invert"
                    alt="Logo"
                    onClick={() => navigate('/')}
                />
                <div className="flex items-center gap-4">
                    <button
                        onClick={logout}
                        className=" text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer  hover:opacity-90 transition
                        "
                    >Logout
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="cursor-pointer text-xl"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>
            </div>
            {/* Admin Content */}
            <div className="
                flex
                min-h-[calc(100vh-70px)]
                bg-white dark:bg-black
            ">
                {/* Sidebar */}
                <Sidebar />
                {/* Page */}
                <main className="
                    flex-1
                    min-w-0
                    bg-white dark:bg-gray-950
                ">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default Layout;