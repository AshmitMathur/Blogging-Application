import React, { useState } from 'react';
import { assets } from '../../Assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

    const { title, createdAt, isPublished } = blog;
    const BlogDate = new Date(createdAt);

    const navigate = useNavigate();

    const { axios, fetchBlogs: fetchHomeBlogs } = useAppContext();

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);


    const deleteBlog = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        try {
            setDeleteLoading(true);

            const { data } = await axios.post("/api/blog/delete", {
                id: blog._id
            });

            if (data.success) {
                toast.success(data.message);

                await fetchBlogs();
                await fetchHomeBlogs();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setDeleteLoading(false);
        }
    };


    const togglePublish = async () => {

        try {
            setPublishLoading(true);

            const { data } = await axios.post("/api/blog/toggle-publish", {
                id: blog._id
            });

            if (data.success) {
                toast.success(data.message);

                await fetchBlogs();
                await fetchHomeBlogs();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setPublishLoading(false);
        }
    };


    return (
        <tr className="border-y border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">

            <th className="px-4 py-4 xl:px-6 font-medium text-gray-700 dark:text-gray-200">
                {index}
            </th>

            <td className="px-4 py-4 text-gray-700 dark:text-gray-200 max-w-xs">
                <p className="truncate" title={title}>
                    {title}
                </p>
            </td>

            <td className="px-4 py-4 max-sm:hidden text-gray-600 dark:text-gray-300">
                {BlogDate.toLocaleDateString()}
            </td>

            <td className="px-4 py-4 max-sm:hidden">
                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        isPublished
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    }`}
                >
                    {isPublished ? "Published" : "Draft"}
                </span>
            </td>

            <td className="px-4 py-4">

                <div className="flex items-center gap-2 text-xs">

                    <button
                        onClick={togglePublish}
                        disabled={publishLoading || deleteLoading}
                        className="border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {publishLoading
                            ? isPublished
                                ? "Unpublishing..."
                                : "Publishing..."
                            : isPublished
                            ? "Unpublish"
                            : "Publish"}
                    </button>


                    <button
                        onClick={() => navigate(`/admin/editblog/${blog._id}`)}
                        disabled={deleteLoading || publishLoading}
                        className="border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Edit
                    </button>


                    <button
                        onClick={deleteBlog}
                        disabled={deleteLoading || publishLoading}
                        className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete blog"
                    >
                        {deleteLoading ? (
                            <div className="w-5 h-5 flex items-center justify-center">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                            </div>
                        ) : (
                            <img
                                src={assets.cross_icon}
                                className="w-5 h-5 hover:scale-110 transition"
                                alt="Delete"
                            />
                        )}
                    </button>

                </div>

            </td>

        </tr>
    );
};

export default BlogTableItem;