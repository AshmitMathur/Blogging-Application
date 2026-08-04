import React, { useEffect, useState } from 'react'
import { blog_data } from '../../Assets/assets';
import BlogTableItem from './BlogTableItem';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Listblog = () => {

    const [blogs, setBlogs] = useState([]);
    const {axios} = useAppContext();

    const fetchBlogs = async ()=> {
        try{
            const{data} = await axios.get('/api/admin/blogs');
            if(data.success){
                setBlogs(data.blogs)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

    useEffect(()=> {
        fetchBlogs();
    }, [])
  return (
    <div className='flex-1 h-4/5 mt-4 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-gray-950'>
      <h1 className='m-2 dark:text-gray-200'>All Blogs</h1>
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
                        {blogs.map((blog, index)=> {
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1}/>
                        })}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default Listblog
