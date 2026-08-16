import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../Assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col min-h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pt-6'>


      <NavLink end={true} to='/admin' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.home_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>DashBoard</p>
      </NavLink>

      <NavLink  to='/admin/addblog' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.add_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Add Blogs</p>
      </NavLink>

      <NavLink  to='/admin/Listblog' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.list_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>List Blogs</p>
      </NavLink>

      <NavLink  to='/admin/comments' className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.comment_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>

      <NavLink
    to="/admin/newsletter"
    className={({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${
            isActive && "bg-primary/10 border-r-4 border-primary"
        }`
    }>
    <img
        src={assets.list_icon}
        alt=""
        className="min-w-4 w-5"
    />
    <p className="hidden md:inline-block">
        Newsletter
    </p>
</NavLink>

    </div>
  )
}

export default Sidebar
