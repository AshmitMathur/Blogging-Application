import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../Assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Blog = () => {
  const {id} = useParams();

  const {axios} = useAppContext();


  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

const fetchBlogData = async () => {
    try {
        const response = await axios.get(`/api/blog/${id}`);


        if (response.data.success) {
            setData(response.data.blog);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const fetchComments = async () => {
    try {
        const { data } = await axios.post("/api/blog/comments", {
            blogId: id,
        });


        if (data.success) {
            setComments(data.comments || []);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

  const addComment = async (e)=> {
    e.preventDefault();
    try{
      const {data} = await axios.post("/api/blog/add-comment", {blogId: id, name,content});

      if(data.success){
        toast.success(data.message);
        setName('');
        setContent('');

        await fetchComments();
      }
      else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

useEffect(() => {
    const fetchData = async () => {
        await fetchBlogData();
        await fetchComments();
    };

    fetchData();
}, [id]);

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
      <Navbar/>
        <div className='text-center mt-20 text-gray-600'>
          <p className='dark:text-gray-300'>Published on {Moment(data.createdAt).format('Do MMMM YYYY')}</p>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 dark:text-gray-300'>{data.title}</h1>
          <h2 className='my-5 max-w-lg truncate mx-auto dark:text-gray-300'>{data.subTitle}</h2>
              <div className="inline-flex items-center gap-3 mt-6 hover:opacity-80 transition cursor-pointer">
<Link
    to={`/profile/${data.author?.username}`}
    className="flex items-center justify-center gap-3 mt-6 hover:opacity-80 transition"
>
    <img
        src={data.author?.avatar || assets.user_icon}
        alt={data.author?.name}
        className="w-12 h-12 rounded-full object-cover"
    />

    <div className="text-left">
        <p className="font-semibold dark:text-gray-300">
            {data.author?.name}
        </p>

        <p className="text-sm text-gray-500">
            @{data.author?.username}
        </p>
    </div>
</Link>

    </div>
        </div>
        {/* inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary */}

        <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6 dark:text-gray-300'>
          <img
    src={data.image || assets.blog_icon} alt={data.title}  className='rounded-3xl mb-5' />
          <div className='rich-text max-w-3xl mx-auto ' dangerouslySetInnerHTML={{__html: data.description}}></div>

            <div className='mt-14 mb-10 max-w-3xl mx-auto'>
              <p className='mt-14 mb-10 max-w-3xl mx-auto'>Comments ({comments.length}) </p>
              <div className='flex flex-col gap-4'>
                {comments.map((item, index) => (
                  <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                    <div>
                      <img src={assets.user_icon} alt="" className='w-6'/>
                      <p className='font-medium dark:text-gray-300'>{item.name}</p>
                    </div>
                    <p className='text-sm max-w-md ml-8 dark:text-gray-300'>{item.content}</p>
                    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs dark:text-gray-300">{Moment(item.createdAt).fromNow()}</div>
                    </div>
                ))}
              </div>
            </div>

              {/* Add comment Section */}
            <div className='max-w-3xl mx-auto'>
                <p className='font-semibold mb-4 dark:text-gray-300'> Add Your Comment</p>
                <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg"  action="">
                  <input onChange={(e) => setName(e.target.value)} value={name}type="text" placeholder='Name' className='w-full p-2 border border-gray-300 rounded outline-none dark:text-gray-300' required />


                  <textarea onChange={(e)=> setContent(e.target.value)} value={content} className='w-full p-2 border border-gray-300 rounded outline-none h-48 dark:text-gray-300' placeholder='Comment' required></textarea>

                  <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
                </form>

            </div>

            {/* {Social media Buttons} */}
            <div className='my-24 max-w-3xl mx-auto dark:text-gray-300'>
              <p className='font-semibold my-4'>Share This Article on Social Media</p>
              <div className='flex'>
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.googleplus_icon} alt="" />
                <img src={assets.facebook_icon} alt="" />
              </div>
            </div>
          </div>
          <Footer/>
    </div>
  ) : <Loader/>
}

export default Blog
