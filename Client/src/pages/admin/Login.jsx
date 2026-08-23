import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { useTheme } from '../../../context/ThemeContext';
import { assets } from '../../Assets/assets';

const Login = () => {
    const { axios, setAuthToken, setIsAdmin, navigate } = useAppContext();
    const { theme, toggleTheme } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/admin/Login', {
                email,
                password
            });

            if (data.success) {
    setAuthToken(data.token);
    setIsAdmin(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='relative flex items-center justify-center min-h-screen px-4 bg-blue-50/50 dark:bg-gray-950'>
            <img
                onClick={() => navigate('/')}
                src={assets.logo}
                alt='Logo'
                className='absolute top-5 left-5 w-32 sm:w-40 cursor-pointer dark:invert'
            />

            <button
                onClick={toggleTheme}
                title='Toggle theme'
                className='absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:scale-105'
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <div className='w-full max-w-md p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg'>
                <div className='mb-8 text-center'>
                    <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>
                        <span className='text-primary'>Admin</span> Login
                    </h1>

                    <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                        Sign in to manage your blog
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='w-full'
                >
                    <div className='mb-5'>
                        <label
                            htmlFor='email'
                            className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'
                        >
                            Email
                        </label>

                        <input
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            required
                            placeholder='Enter your email'
                            className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition'
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='password'
                            className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'
                        >
                            Password
                        </label>
                        <input
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            required
                            placeholder='Enter your password'
                            className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full py-2.5 font-medium text-white bg-primary rounded-lg cursor-pointer hover:opacity-90 hover:shadow-md transition-all duration-200'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;