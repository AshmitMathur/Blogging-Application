import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../Assets/assets'
import BlogTableItem from './BlogTableItem'
import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setdashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const {axios} = useAppContext();

    const fetchDashboard = async ()=> {
        try {
            const {data} = await axios.get("/api/admin/dashboard");
            data.success ? setdashboardData(data.dashboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50 dark:bg-gray-900'>
        <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all dark:bg-gray-700'> 
                <img src={assets.dashboard_icon_1} alt="" />

                <div>
            <p className='text-xl font-semibold text-gray-600'></p>
            <p className='dark:text-gray-200'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light dark:text-gray-200'>Blogs</p>
            </div>
        </div>

            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all dark:bg-gray-700'> 
                <img src={assets.dashboard_icon_2} alt="" />

                <div>
            <p className='text-xl font-semibold text-gray-600'></p>
            <p className='dark:text-gray-200'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light dark:text-gray-200'>Comments</p>
            </div>
        </div>


            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all dark:bg-gray-700'> 
                <img src={assets.dashboard_icon_3} alt="" />

                <div>
            <p className='text-xl font-semibold text-gray-600'></p>
            <p className='dark:text-gray-200'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light dark:text-gray-200'>Drafts</p>
            </div>
        </div>

        </div>

        <div>
            <div className='flex items-center gap-3 m-4 mt-6 text-gray-600 dark:text-gray-200'>
                <img src={assets.dashboard_icon_4} alt="" />
                <p>Latest Blogs</p>
            </div>

            <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white dark:bg-gray-700'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr>
                            <th scope='col' className='px-2 py-4 xl:px-6 dark:text-gray-200'> # </th>
                            <th scope='col' className='px-2 py-4 dark:text-gray-200'> Blog Title </th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden dark:text-gray-200'> Date </th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden dark:text-gray-200'> Status </th>
                            <th scope='col' className='px-2 py-4 dark:text-gray-200'> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.recentBlogs.map((blog, index)=> {
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default Dashboard
