import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogCard = ({blog}) => {
    const {title, description, category,image, _id} = blog;
    const { user, axios, removeBlog } = useAppContext();
    const navigate = useNavigate();

    const isOwner = user && blog.author?._id === user._id;

  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer dark:bg-gray-950'>

      <img src={image} alt="" className='aspect-video' />
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full
      text-primary text-xs '>{category}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900 dark:text-gray-100'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600 dark:text-gray-100' dangerouslySetInnerHTML={{"__html": description.slice(0, 80)}}></p>
{isOwner && (
    <>
        <button
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit-blog/${blog._id}`);
            }}
            className="mt-3 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:scale-105 transition-all"
        >
            Edit
        </button>

        <button
            onClick={async (e) => {
                e.stopPropagation();

                const confirmDelete = window.confirm(
                    "Are you sure you want to delete this blog?"
                );

                if (!confirmDelete) return;

                try {
                          const { data } = await axios.post(
                              "/api/blog/delete",
                              {
                                  id: blog._id
                              }
                          );

                    if (data.success) {
                        toast.success(data.message);
                        removeBlog(blog._id);
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(
                        error.response?.data?.message || error.message
                    );
                }
            }}
            className="mt-3 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:scale-105 transition-all"
        >
            Delete
        </button>
    </>
)}

      </div>
    </div>
  )
}

export default BlogCard
