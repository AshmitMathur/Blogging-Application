import React, { useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/NavBar.jsx";
import Footer from "../../../components/Footer.jsx";
import { assets } from "../../../Assets/assets.js";

const EditProfile = () => {

    const { axios, user, setUser } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [loading, setLoading] = useState(false);

    const updateProfile = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.put("/api/user/update", {
                name,
                bio,
                avatar
            });

            if (data.success) {

                toast.success("Profile updated successfully");

                setUser(data.user);

                navigate(`/profile/${data.user.username}`);

            } else {
                toast.error(data.message);
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                error.message
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            <Navbar />

            <main className="px-4 py-12 sm:px-6 lg:px-8">

                <div className="max-w-2xl mx-auto">

                    {/* Header */}

                    <div className="text-center mb-10">

                        <h1 className="
                            text-3xl
                            sm:text-4xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        ">
                            Edit Profile
                        </h1>

                        <p className="
                            mt-3
                            text-gray-500
                            dark:text-gray-400
                        ">
                            Update your profile information and
                            let people know more about you.
                        </p>

                    </div>


                    {/* Card */}

                    <div className="
                        bg-white
                        dark:bg-gray-900
                        rounded-2xl
                        border
                        border-gray-200
                        dark:border-gray-800
                        shadow-lg
                        shadow-gray-200/50
                        dark:shadow-black/30
                        overflow-hidden
                    ">

                        {/* Profile Preview */}

                        <div className="
                            flex
                            flex-col
                            items-center
                            py-8
                            px-6
                            border-b
                            border-gray-200
                            dark:border-gray-800
                        ">

                            <div className="
                                relative
                                group
                            ">

                                <img
                                    src={
                                        avatar ||
                                        assets.user_icon
                                    }
                                    alt={name}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            assets.user_icon;
                                    }}
                                    className="
                                        w-28
                                        h-28
                                        rounded-full
                                        object-cover
                                        border-4
                                        border-primary/20
                                        shadow-md
                                        transition-transform
                                        duration-300
                                        group-hover:scale-105
                                    "
                                />

                            </div>

                            <h2 className="
                                mt-4
                                text-xl
                                font-semibold
                                text-gray-900
                                dark:text-white
                            ">
                                {name || "Your Name"}
                            </h2>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                            ">
                                @{user?.username}
                            </p>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={updateProfile}
                            className="p-6 sm:p-8 space-y-6"
                        >

                            {/* Name */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    dark:text-gray-300
                                    mb-2
                                ">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Enter your name"
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-gray-300
                                        dark:border-gray-700
                                        bg-white
                                        dark:bg-gray-800
                                        text-gray-900
                                        dark:text-white
                                        placeholder-gray-400
                                        outline-none
                                        transition-all
                                        duration-200
                                        focus:border-primary
                                        focus:ring-4
                                        focus:ring-primary/10
                                    "
                                />

                            </div>


                            {/* Bio */}

                            <div>

                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                    mb-2
                                ">

                                    <label className="
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        dark:text-gray-300
                                    ">
                                        Bio
                                    </label>

                                    <span className="
                                        text-xs
                                        text-gray-400
                                    ">
                                        {bio.length}/160
                                    </span>

                                </div>

                                <textarea
                                    value={bio}
                                    maxLength={160}
                                    onChange={(e) =>
                                        setBio(e.target.value)
                                    }
                                    placeholder="Tell people a little about yourself..."
                                    rows={5}
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-gray-300
                                        dark:border-gray-700
                                        bg-white
                                        dark:bg-gray-800
                                        text-gray-900
                                        dark:text-white
                                        placeholder-gray-400
                                        outline-none
                                        resize-none
                                        transition-all
                                        duration-200
                                        focus:border-primary
                                        focus:ring-4
                                        focus:ring-primary/10
                                    "
                                />

                            </div>


                            {/* Avatar */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    dark:text-gray-300
                                    mb-2
                                ">
                                    Avatar URL
                                </label>

                                <input
                                    type="url"
                                    value={avatar}
                                    onChange={(e) =>
                                        setAvatar(e.target.value)
                                    }
                                    placeholder="https://example.com/avatar.jpg"
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-gray-300
                                        dark:border-gray-700
                                        bg-white
                                        dark:bg-gray-800
                                        text-gray-900
                                        dark:text-white
                                        placeholder-gray-400
                                        outline-none
                                        transition-all
                                        duration-200
                                        focus:border-primary
                                        focus:ring-4
                                        focus:ring-primary/10
                                    "
                                />
                                <p className="
                                    mt-2
                                    text-xs
                                    text-gray-400
                                ">
                                    Use a publicly accessible image URL.
                                </p>
                            </div>
                            {/* Buttons */}
                            <div className=" flex flex-col-reverse sm:flex-row sm:justify-end gap-3  pt-4 border-t border-gray-200 dark:border-gray-800
                            ">
                                <button type="button"
                                    onClick={() =>
                                        navigate(
                                            `/profile/${user?.username}`
                                        )
                                    }
                                    className="  w-full sm:w-auto  px-6  py-3  rounded-xl  border   border-gray-300  dark:border-gray-700   text-gray-700   dark:text-gray-300  hover:bg-gray-100 dark:hover:bg-gray-800 transition-all  duration-200 cursor-pointer"
                                > Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className=" w-full sm:w-auto px-7  py-3 rounded-xl bg-primary text-white font-medium shadow-sm hover:bg-primary/90  hover:shadow-md
                                        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer
                                    " > {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EditProfile;