import React from 'react'
import { assets } from '../../Assets/assets'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'
import { useTheme } from '../../../context/ThemeContext'

const Layout = () => {

    const {axios, setToken, navigate} = useAppContext();
    const { theme, toggleTheme } = useTheme();


    const logout = ()=> {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null);
        navigate('/');
    }
  return (
    <>
    <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
      <img src={assets.logo} className='w-32 sm:w-40 cursor-pointer' alt="" onClick={()=> navigate('/')} />
      <div className='flex items-center gap-4'>
      <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      <button onClick={toggleTheme} className='cursor-pointer'>
    {theme === "light" ? "🌙" : "☀️"}
      </button>
      </div>
    </div>
    <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        <Outlet/>
    </div>
    </>
  )
}

export default Layout
