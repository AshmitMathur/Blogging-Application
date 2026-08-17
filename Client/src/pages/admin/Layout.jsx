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
        <div className='min-h-screen bg-blue-50/50 dark:bg-gray-950'>
            <header className='flex items-center justify-between h-[70px] px-4 sm:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950'>
                <img
                    src={assets.logo}
                    alt='Logo'
                    onClick={() => navigate('/')}
                    className='w-32 sm:w-40 cursor-pointer dark:invert'
                />

                <div className='flex items-center gap-3'>
                    <button
                        onClick={logout}
                        className='px-5 sm:px-7 py-2 text-sm font-medium bg-primary text-white rounded-full cursor-pointer hover:opacity-90 transition-all duration-200'
                    >
                        Logout
                    </button>
                    <button
                        onClick={toggleTheme}
                        title='Toggle theme'
                        className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:scale-105'
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                </div>
            </header>

            <div className='flex min-h-[calc(100vh-70px)]'>
                <Sidebar />

                <main className='flex-1 min-w-0 bg-blue-50/50 dark:bg-gray-950'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;