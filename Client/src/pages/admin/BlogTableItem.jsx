import React from 'react'
import { assets } from '../../Assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BlogTableItem = ({blog, fetchBlogs, index}) => {

    const {title, createdAt} = blog;
    const BlogDate = new Date(createdAt);

    const navigate = useNavigate();

    const { axios, fetchBlogs: fetchHomeBlogs } = useAppContext();
    const deleteBlog = async()=> {
      const confirm = window.confirm("Are you sure you want to delete this Blog");
      if(!confirm) return;

      try {
        const {data} = await axios.post("/api/blog/delete", {id: blog._id});
        if(data.success){
          toast.success(data.message);
          await fetchBlogs();
          await fetchHomeBlogs();
        }  
        else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

const togglePublish = async () => {
    try {
        const { data } = await axios.post(
            "/api/blog/toggle-publish",
            { id: blog._id }
        );

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
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4 dark:text-gray-200'> {index} </th>
      <td className='px-2 py-4 dark:text-gray-200'> {title}</td>
      <td className='px-2 py-4 max-sm:hidden dark:text-gray-200'> {BlogDate.toDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}> {blog.isPublished ? "Published" : "UnPublished"}</p>
      </td>
      <td className='px-2 py-4 flex gap-3 text-xs'>
        <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer dark:text-gray-200'>{blog.isPublished ? "UnPublish" : "Publish"}</button>
        <button onClick={() => navigate(`/admin/editblog/${blog._id}`)}
    className="border px-2 py-0.5 mt-1 rounded cursor-pointer dark:text-gray-200"
>Edit</button>
        <img src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt=""  onClick={deleteBlog}/>
      </td>
    </tr>
  )
}

export default BlogTableItem
