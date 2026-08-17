import React, { useEffect, useState } from 'react';
import { assets } from '../../Assets/assets';
import BlogTableItem from './BlogTableItem';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        newsletterSubscribers: 0,
        recentBlogs: []
    });

    const { axios } = useAppContext();
    const navigate = useNavigate();

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get("/api/admin/dashboard");

            if (data.success) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };
    useEffect(() => {
        fetchDashboard();
    }, []);
    return (
        <div className='flex-1 min-h-screen p-4 md:p-10 bg-blue-50/50 dark:bg-gray-950'>
            {/* Dashboard Header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                    Dashboard
                </h1>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                    Overview of your blog and website activity.
                </p>
            </div>
            {/* Dashboard Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
                {/* Blogs */}
                <div
                    onClick={() => navigate('/admin/listblog')}
                    className='group flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-primary transition-all duration-200 cursor-pointer'
                >
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-white/20'>
                        <img
                            src={assets.dashboard_icon_1}
                            alt='Blogs'
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-white'>
                            {dashboardData.blogs}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80'>
                            Blogs
                        </p>
                    </div>
                </div>
                {/* Comments */}
                <div
                    onClick={() => navigate('/admin/comments')}
                    className='group flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-primary transition-all duration-200 cursor-pointer'
                >
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-white/20'>
                        <img
                            src={assets.dashboard_icon_2}
                            alt='Comments'
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-white'>
                            {dashboardData.comments}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80'>
                            Comments
                        </p>
                    </div>
                </div>
                {/* Drafts */}
                <div
                    onClick={() => navigate('/admin/listblog')}
                    className='group flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-primary transition-all duration-200 cursor-pointer'
                >
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-white/20'>
                        <img
                            src={assets.dashboard_icon_3}
                            alt='Drafts'
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-white'>
                            {dashboardData.drafts}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80'>
                            Drafts
                        </p>
                    </div>
                </div>
                {/* Newsletter Subscribers */}
                <div
                    onClick={() => navigate('/admin/newsletter')}
                    className='group flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-primary transition-all duration-200 cursor-pointer'
                >
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-white/20'>
                        <img
                            src={assets.dashboard_icon_4}
                            alt='Newsletter Subscribers'
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-white'>
                            {dashboardData.newsletterSubscribers}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80'>
                            Newsletter Subscribers
                        </p>
                    </div>
                </div>
            </div>
            {/* Latest Blogs */}
            <div className='mt-8'>
                <div className='flex items-center gap-3 mb-4'>
                    <img
                        src={assets.dashboard_icon_1}
                        alt='Latest Blogs'
                        className='w-6 h-6'
                    />
                    <div>
                        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
                            Latest Blogs
                        </h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Your most recently created blog posts.
                        </p>
                    </div>
                </div>
                {/* Table */}
                <div className='relative max-w-5xl overflow-x-auto rounded-xl shadow-sm scrollbar-hide bg-white dark:bg-gray-800'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-600 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-4 py-4 xl:px-6'
                                > #
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4'
                                >
                                    Blog Title
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 max-sm:hidden'
                                >
                                    Date </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 max-sm:hidden'
                                > Status
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4'
                                > Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog, index) => (
                                <BlogTableItem
                                    key={blog._id}
                                    blog={blog}
                                    fetchBlogs={fetchDashboard}
                                    index={index + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;