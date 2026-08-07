import React, { useState } from 'react'
import { blog_data, blogCategories } from '../Assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard';
import { useAppContext } from '../../context/AppContext';

const BlogList = () => {

    const [menu, setmenu] = useState("All");
    const {blogs, input} = useAppContext();

    const filteredBlogs = () => {
      if(input == ''){
        return blogs;
      }
      return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }
  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
    {blogCategories.map((item)=> (
        <div key={item} className='relative'>
            <button onClick = {()=> setmenu(item)} 
            className={`relative z-10 cursor-pointer px-4 py-1 rounded-full transition-colors duration-300 
  ${
  menu === item
    ? "text-white"
    : "text-gray-600 dark:text-gray-400"
  }`}>{item}
            
                {menu === item && (
                    <motion.div layoutId='underline'
                    transition={{type: 'spring', stiffness:500, damping:30}}
                     className='absolute inset-0 -z-10 rounded-full bg-primary'>

                </motion.div>
                )}

            </button>
        </div>
    ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu).map((blog)=> <BlogCard key={blog._id} blog={blog}/>)} 
      </div>
    </div>
  )
}

export default BlogList
