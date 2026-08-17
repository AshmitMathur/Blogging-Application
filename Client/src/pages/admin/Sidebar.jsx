import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../Assets/assets';

const Sidebar = () => {
    const navItems = [
        {
            to: '/admin',
            label: 'Dashboard',
            icon: assets.home_icon,
            end: true
        },
        {
            to: '/admin/addblog',
            label: 'Add Blogs',
            icon: assets.add_icon
        },
        {
            to: '/admin/listblog',
            label: 'List Blogs',
            icon: assets.list_icon
        },
        {
            to: '/admin/comments',
            label: 'Comments',
            icon: assets.comment_icon
        },
        {
            to: '/admin/newsletter',
            label: 'Newsletter',
            icon: assets.list_icon
        }
    ];

    return (
        <aside className='flex flex-col min-h-screen w-16 md:w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pt-6'>
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                        `group flex items-center gap-3 py-3.5 px-3 md:px-8 border-r-4 transition-all duration-200 ${
                            isActive
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`
                    }
                >
                    <img
                        src={item.icon}
                        alt={item.label}
                        className='w-5 h-5 shrink-0'
                    />

                    <p className='hidden md:inline-block text-sm font-medium'>
                        {item.label}
                    </p>
                </NavLink>
            ))}
        </aside>
    );
};

export default Sidebar;