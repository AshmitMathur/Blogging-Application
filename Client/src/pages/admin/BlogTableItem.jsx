import React from 'react';
import { assets } from '../../Assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  const navigate = useNavigate();
  const { axios, fetchBlogs: fetchHomeBlogs } = useAppContext();

  const deleteBlog = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
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
    }
  };

  const togglePublish = async () => {
    try {
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
            className="border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>

          <button
            onClick={() => navigate(`/admin/editblog/${blog._id}`)}
            className="border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={deleteBlog}
            className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition cursor-pointer"
            title="Delete blog"
          >
            <img
              src={assets.cross_icon}
              className="w-5 h-5 hover:scale-110 transition"
              alt="Delete"
            />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default BlogTableItem;