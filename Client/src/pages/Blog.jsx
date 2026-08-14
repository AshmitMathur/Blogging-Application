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

  const {axios, user, isAdmin, fetchBlogs} = useAppContext();


  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

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
const fetchLikeData = async () => {
    try {
        const { data } = await axios.get(`/api/blog/like/${id}`);

        if (data.success) {
            setLikeCount(data.likeCount);
            setLiked(data.liked);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const handleLike = async () => {
    if (!user) {
        toast.error("Please login to like this blog");
        return;
    }

    try {
        const { data } = await axios.post(`/api/blog/like/${id}`);

        if (data.success) {
            setLiked(data.liked);
            setLikeCount((prev) =>
                data.liked ? prev + 1 : prev - 1
            );
            await fetchBlogs();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Please login to like this blog"
        );
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
        await fetchLikeData();
    };

    fetchData();
}, [id]);

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
      <Navbar/>
<div className="max-w-4xl mx-auto text-center pt-16 pb-10 px-5">

    {/* Category */}
    <span className="inline-block px-4 py-1.5  mb-5  text-sm font-medium text-primary bg-primary/10  border border-primary/20 rounded-full
    ">
        {data.category}
    </span>

    {/* Date */}
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Published on {Moment(data.createdAt).format("Do MMMM YYYY")}
    </p>

    {/* Title */}
    <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white
    ">
        {data.title}
    </h1>

    {/* Subtitle */}
    {data.subTitle && (
        <p className=" mt-5 text-base sm:text-lg leading-relaxed text-gray-500  dark:text-gray-400 max-w-2xl mx-auto
        ">
            {data.subTitle}
        </p>
    )}

    {/* Author */}
    {data.author ? (
        <Link
            to={`/profile/${data.author.username}`}
            className=" inline-flex items-center gap-3 mt-8 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition
            "
        >
            <img
                src={data.author.avatar || assets.user_icon}
                alt={data.author.name}
                className="  w-11 h-11 rounded-full object-cover border border-gray-200 dark:border-gray-700
                "
            />

            <div className="text-left">
                <p className=" text-sm font-semibold text-gray-900 dark:text-white
                ">
                    {data.author.name}
                </p>

                <p className=" text-xs  text-gray-500 dark:text-gray-400
                ">
                    @{data.author.username}
                </p>
            </div>
        </Link>
    ) : (
        <div className="  inline-flex  items-center  gap-2 mt-8  px-4 py-2 rounded-xl  bg-gray-100 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400
        ">
            <span>✦</span>
            Published by Admin
        </div>
    )}

</div>
        {/* inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary */}

        <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6 dark:text-gray-300'>
          <img
    src={data.image || assets.blog_icon} alt={data.title}  className='            w-full aspect-[16/9] object-cover rounded-2xl sm:rounded-3xl shadow-lg  border border-gray-100 dark:border-gray-800 hover:scale-[1.01]' />
          <div className='rich-text max-w-3xl mx-auto mt-12 px-1 text-gray-700 dark:text-gray-300 leading-8' dangerouslySetInnerHTML={{__html: data.description}}>
          </div>
          <div className="max-w-3xl mx-auto mt-8 flex items-center gap-3">

    <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all cursor-pointer
            ${
                liked
                    ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-950/30 dark:border-red-900"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            }
        `}
    >
        <span className="text-xl">
            {liked ? "❤️" : "🤍"}
        </span>

        <span className="font-medium">
            {likeCount}
        </span>

        <span>
            {liked ? "Liked" : "Like"}
        </span>
    </button>

</div>

            <div className='mt-14 mb-10 max-w-3xl mx-auto'>
<div className="flex items-center justify-between mb-6">

    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Comments
    </h2>

    <span
        className="  px-3 py-1  text-xs font-medium rounded-full bg-primary/10 text-primary
        "
    > {comments.length}
    </span>

</div>
<div className="flex flex-col gap-4">
    {comments.map((item, index) => (
        <div
            key={index}
            className=" relative  p-5  rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow
            ">
            <div className="flex items-center gap-3">
                <img
                    src={assets.user_icon}
                    alt=""
                    className="w-6 h-6 rounded-full"
                />
                <p className="font-medium dark:text-gray-300">
                    {item.name}
                </p>
            </div>
            <p className="text-sm max-w-md ml-9 mt-2 dark:text-gray-300">
                {item.content}
            </p>
            {/* Timestamp */}
            <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                {Moment(item.createdAt).fromNow()}
            </div>
        </div>
    ))}
</div>
            </div>

              {/* Add comment Section */}
<div
    className=" max-w-3xl mx-auto mt-16 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60
    "
>

    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Leave a comment
    </h2>

    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
        Share your thoughts about this article.
    </p>

    {user && !isAdmin && (
    <div className="flex items-center gap-3 mb-5">
        <img
            src={user.avatar || assets.user_icon}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />

        <div>
            <p className="font-semibold text-gray-900 dark:text-white">
                {user.name}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
                @{user.username}
            </p>
        </div>
    </div>
)}

{isAdmin && (
    <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            👑
        </div>

        <div>
            <p className="font-semibold text-gray-900 dark:text-white">
                Admin
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
                Posting as administrator
            </p>
        </div>
    </div>
)}

    <form
        onSubmit={addComment}
        className="flex flex-col gap-4"
    >

{!user && !isAdmin && (
    <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Your name"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
    />
)}

        <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Write your comment..."
            required
            className=" w-full min-h-36 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white outline-none resize-y focus:ring-2 focus:ring-primary/30 focus:border-primary transition
            "
        />
        <div className="flex justify-end">
            <button
                type="submit"
                className=" px-6 py-3  rounded-xl  bg-primary text-white font-medium hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all cursor-pointer
                "> Post Comment
            </button>
        </div>
    </form>
</div>
            {/* {Social media Buttons} */}
            <div className='my-6 max-w-3xl mx-auto dark:text-gray-300'>
              <p className='font-semibold my-4'>Share This Article on Social Media</p>
              <div
    className="  max-w-3xl mx-auto my-15
        pt-10 border-t border-gray-200 dark:border-gray-800 text-center
    "
>

    <p className="font-semibold text-gray-900 dark:text-white mb-5">
        Enjoyed this article?
    </p>

    <div className="flex justify-center gap-3">

        <button
            onClick={() =>
                navigator.clipboard.writeText(window.location.href)
            }
            className="  px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer
            "
        >
            🔗 Copy Link
        </button>

        <button
            onClick={() => {
                navigator.share?.({
                    title: data.title,
                    url: window.location.href,
                });
            }}
            className=" px-4 py-2  rounded-lg bg-primary text-white text-sm hover:bg-primary/90 transition cursor-pointer
            "
        >
            Share
        </button>

    </div>

</div>
            </div>
          </div>
          <Footer/>
    </div>
  ) : <Loader/>
}

export default Blog
