import React, { useEffect, useState } from 'react';
import BlogTableItem from './BlogTableItem';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Listblog = () => {

    const { axios } = useAppContext();

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("/api/admin/blogs");

            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === 'All' ||
            (filter === 'Published' && blog.isPublished) ||
            (filter === 'Drafts' && !blog.isPublished);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className='flex-1 min-h-screen p-4 md:p-10 bg-blue-50/50 dark:bg-gray-950'>
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                    All Blogs
                </h1>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                    Manage, edit and monitor all your blog posts.
                </p>
            </div>

            <div className='flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between'>
                <div className='relative w-full sm:w-72'>
                    <input
                        type='text'
                        placeholder='Search blogs...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition'
                    />
                </div>

                <div className='flex gap-2'>
                    {['All', 'Published', 'Drafts'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-2 rounded-full text-sm border cursor-pointer transition ${
                                filter === item
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className='mb-5 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl'>
                <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm'>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Total Blogs
                    </p>
                    <p className='mt-1 text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                        {blogs.length}
                    </p>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm'>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Published
                    </p>
                    <p className='mt-1 text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                        {blogs.filter((blog) => blog.isPublished).length}
                    </p>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm'>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Drafts
                    </p>
                    <p className='mt-1 text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                        {blogs.filter((blog) => !blog.isPublished).length}
                    </p>
                </div>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className='max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-sm p-10 text-center'>
                    <p className='text-gray-500 dark:text-gray-400'>
                        {search
                            ? 'No blogs found matching your search.'
                            : 'No blogs available.'}
                    </p>
                </div>
            ) : (
                <div className='relative max-w-5xl overflow-x-auto shadow-sm rounded-xl scrollbar-hide bg-white dark:bg-gray-800'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-600 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50'>
                            <tr>
                                <th scope='col' className='px-4 py-4 xl:px-6'>
                                    #
                                </th>
                                <th scope='col' className='px-4 py-4'>
                                    Blog Title
                                </th>
                                <th scope='col' className='px-4 py-4 max-sm:hidden'>
                                    Date
                                </th>
                                <th scope='col' className='px-4 py-4 max-sm:hidden'>
                                    Status
                                </th>
                                <th scope='col' className='px-4 py-4'>
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredBlogs.map((blog, index) => (
                                <BlogTableItem
                                    key={blog._id}
                                    blog={blog}
                                    fetchBlogs={fetchBlogs}
                                    index={index + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Listblog;