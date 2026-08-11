import React from 'react'
import { assets } from '../Assets/assets'
import { useAppContext } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'

const Navbar = () => {
  const { navigate, user, isAdmin, logout, token } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>

      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='w-32 sm:w-44 cursor-pointer dark:invert'
      />

      <div className='flex items-center gap-4'>

        {/* NORMAL USER LOGGED OUT */}
        {!user && !isAdmin && (
          <>
            <button
              onClick={() => navigate('/login')}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5 hover:scale-105 transition-all'
            >
              Login
              <img
                src={assets.arrow}
                className='w-3'
                alt="arrow"
              />
            </button>

            <button
              onClick={() => navigate('/admin')}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5 hover:scale-105 transition-all'
            >
              Admin Login
              <img
                src={assets.arrow}
                className='w-3'
                alt="arrow"
              />
            </button>
          </>
        )}

        {/* NORMAL USER LOGGED IN */}
        {user && !isAdmin && (
          <>
            <button
              onClick={() => navigate(`/profile/${user.username}`)}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5 hover:scale-105 transition-all'
            >
              Profile
            </button>

            <button
              onClick={logout}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-5 py-2.5 hover:scale-105 transition-all'
            >
              Logout
            </button>
          </>
        )}

        {/* ADMIN LOGGED IN */}
        {isAdmin && (
          <>
            <button
              onClick={() => navigate('/admin')}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5'
            >
              Dashboard
              <img
                src={assets.arrow}
                className='w-3'
                alt="arrow"
              />
            </button>

            <button
              onClick={logout}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-5 py-2.5'
            >
              Logout
            </button>
          </>
        )}

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          className='   flex items-center justify-center
                        rounded-full
                        text-lg
                        bg-gray-100
                        dark:bg-gray-800
                        hover:bg-gray-200
                        dark:hover:bg-gray-700
                        cursor-pointer
                        transition-all duration-200
                        hover:scale-105"'
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </div>
    </div>
  )
}

export default Navbar