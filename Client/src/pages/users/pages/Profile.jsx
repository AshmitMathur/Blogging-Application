import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import Navbar from "../components/NavBar.jsx";
import Footer from "../../../components/Footer.jsx";
import Loader from "../../../components/Loader.jsx";
// import Moment from "moment";
import { assets } from "../../../Assets/assets.js";
import toast from "react-hot-toast";
import BlogCard from "../../../components/BlogCard.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const { axios, user: currentUser } = useAppContext();

    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const { data } = await axios.get(`/api/user/${username}`);

            if (data.success) {
                setUser(data.user);
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [username]);

    if (!user) return <Loader />;

    return (
        <>
            <Navbar />

            <div className="max-w-5xl mx-auto py-16 px-5">

                <div className="flex flex-col md:flex-row items-center gap-6">

                    <img
                        src={user.avatar || assets.user_icon} alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                    />

                    <div className="text-center md:text-left">
                       <h1 className="text-4xl font-bold dark:text-white">
                            {user.name}
                        </h1>

                        <p className="text-gray-500">
                            @{user.username}
                        </p>

<p className="mt-2 dark:text-gray-300">
    {user.bio || "No bio yet."}
</p>

{
currentUser?.username === user.username && (
<button
onClick={()=>navigate("/edit-profile")}
className="mt-4 bg-primary text-white px-5 py-2 rounded"
>
Edit Profile
</button> 
)}


<p className="mt-2 text-gray-500">
    {blogs.length} {blogs.length === 1 ? "Blog" : "Blogs"}
</p>
                    </div>
<h2 className="text-2xl font-bold mt-16 mb-8 dark:text-white">
    Published Blogs
</h2>
                </div>

<h2 className="text-2xl font-semibold mt-14 mb-8 dark:text-white">
    Blogs by {user.name}
</h2>

{blogs.length === 0 ? (
<p className="text-center text-gray-500 py-12">
    No blogs published yet.
</p>
) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
            <BlogCard
                key={blog._id}
                blog={blog}
            />
        ))}
    </div>
)}

            </div>

            <Footer />
        </>
    );
};

export default Profile;