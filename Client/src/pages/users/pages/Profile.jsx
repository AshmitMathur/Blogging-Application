import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import Navbar from "../components/NavBar.jsx";
import Footer from "../../../components/Footer.jsx";
import Loader from "../../../components/Loader.jsx";
import { assets } from "../../../Assets/assets.js";
import toast from "react-hot-toast";
import BlogCard from "../../../components/BlogCard.jsx";

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const {
        axios,
        user: currentUser,
    } = useAppContext();

    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);

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
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [username]);

    if (!user) {
        return <Loader />;
    }

    const isOwnProfile =
        currentUser?.username === user.username;

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 dark:bg-black">

                {/* Profile Header */}
                <section className="max-w-5xl mx-auto px-5 pt-12 pb-10">

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-10">

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-7">

                            {/* Avatar */}
                            <img
                                src={
                                    user.avatar ||
                                    assets.user_icon
                                }
                                alt={user.name}
                                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-primary/20"
                            />

                            {/* User Information */}
                            <div className="flex-1 text-center md:text-left">

                                <div className="flex flex-col md:flex-row md:items-center gap-3">

                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                        {user.name}
                                    </h1>

                                    {isOwnProfile && (
                                        <span className="self-center md:self-auto text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                            Your Profile
                                        </span>
                                    )}

                                </div>

                                <p className="mt-1 text-gray-500 dark:text-gray-400">
                                    @{user.username}
                                </p>

                                {/* Bio */}
                                <p className="mt-5 max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {user.bio ||
                                        "This user hasn't added a bio yet."}
                                </p>

                                {/* Stats */}
                                <div className="flex justify-center md:justify-start gap-8 mt-6">

                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {blogs.length}
                                        </p>

                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {blogs.length === 1
                                                ? "Blog"
                                                : "Blogs"}
                                        </p>
                                    </div>

                                </div>

                                {/* Edit Profile */}
                                {isOwnProfile && (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/edit-profile"
                                            )
                                        }
                                        className="mt-6 px-5 py-2.5 bg-primary text-white rounded-lg font-medium cursor-pointer hover:bg-primary/90 transition"
                                    >
                                        Edit Profile
                                    </button>
                                )}

                            </div>
                        </div>

                    </div>
                </section>

                {/* Blogs Section */}
                <section className="max-w-5xl mx-auto px-5 pb-16">

                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                Published Blogs
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Articles written by {user.name}
                            </p>
                        </div>

                    </div>

                    {/* No Blogs */}
                    {blogs.length === 0 ? (
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-16 px-5 text-center">

                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                No blogs published yet
                            </h3>

                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                {isOwnProfile
                                    ? "Start writing your first blog and share your ideas with the world."
                                    : `${user.name} hasn't published any blogs yet.`}
                            </p>

                            {isOwnProfile && (
                                <button
                                    onClick={() =>
                                        navigate("/write")
                                    }
                                    className="mt-6 px-5 py-2.5 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition"
                                >
                                    Write Your First Blog
                                </button>
                            )}

                        </div>
                    ) : (

                        /* Blog Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                            {blogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    blog={blog}
                                />
                            ))}

                        </div>

                    )}

                </section>

            </main>

            <Footer />
        </>
    );
};

export default Profile;
