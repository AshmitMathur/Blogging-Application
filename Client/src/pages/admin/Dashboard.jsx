import React, { useEffect, useState } from 'react'
import { assets } from '../../Assets/assets'
import BlogTableItem from './BlogTableItem'
import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setdashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        newsletterSubscribers: 0,
        recentBlogs: []
    })

    const { axios } = useAppContext();

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get("/api/admin/dashboard");

            data.success
                ? setdashboardData(data.dashboardData)
                : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='flex-1 min-h-screen p-4 md:p-10 bg-blue-50/50 dark:bg-gray-900'>
            {/* Dashboard Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
                {/* Blogs */}
                <div className='flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200'>
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30'>
                        <img
                            src={assets.dashboard_icon_1}
                            alt="Blogs"
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                            {dashboardData.blogs}
                        </p>

                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Blogs
                        </p>
                    </div>
                </div>
                {/* Comments */}
                <div className='flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200'>
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30'>
                        <img
                            src={assets.dashboard_icon_2}
                            alt="Comments"
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                            {dashboardData.comments}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Comments
                        </p>
                    </div>
                </div>
                {/* Drafts */}
                <div className='flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200'>
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30'>
                        <img
                            src={assets.dashboard_icon_3}
                            alt="Drafts"
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                            {dashboardData.drafts}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Drafts
                        </p>
                    </div>
                </div>
                {/* Newsletter Subscribers */}
                <div className='flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200'>
                    <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30'>
                        <img
                            src={assets.dashboard_icon_4}
                            alt="Newsletter Subscribers"
                            className='w-7 h-7'
                        />
                    </div>
                    <div>
                        <p className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                            {dashboardData.newsletterSubscribers}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Newsletter Subscribers
                        </p>
                    </div>
                </div>
            </div>
            {/* Latest Blogs */}
            <div className='mt-8'>
                <div className='flex items-center gap-3 mb-4 text-gray-700 dark:text-gray-200'>
                    <img
                        src={assets.dashboard_icon_4}
                        alt="Latest Blogs"
                        className='w-6 h-6'
                    />
                    <h2 className='text-lg font-semibold'>
                        Latest Blogs
                    </h2>
                </div>
                <div className='relative max-w-5xl overflow-x-auto shadow-sm rounded-xl scrollbar-hide bg-white dark:bg-gray-800'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-600 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-4 py-4 xl:px-6'
                                >
                                    #
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
                                    Date
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 max-sm:hidden'
                                >
                                    Status
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4'
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog, index) => {
                                return (
                                    <BlogTableItem
                                        key={blog._id}
                                        blog={blog}
                                        fetchBlogs={fetchDashboard}
                                        index={index + 1}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard