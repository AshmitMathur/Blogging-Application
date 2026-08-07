import React, { useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProfile = () => {

    const { axios, user, setUser } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [avatar, setAvatar] = useState(user?.avatar || "");

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put("/api/user/update", {
                name,
                bio,
                avatar
            });

            if(data.success){
                toast.success("Profile updated");

                setUser(data.user);

                navigate(`/profile/${data.user.username}`);
            }
            else{
                toast.error(data.message);
            }

        } catch(error){
            toast.error(error.message);
        }
    }


    return (
        <div className="max-w-xl mx-auto py-16 px-5">

            <h1 className="text-3xl font-bold mb-8 dark:text-white">
                Edit Profile
            </h1>


            <form 
            onSubmit={updateProfile}
            className="flex flex-col gap-5"
            >

                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Name"
                className="border p-3 rounded dark:bg-gray-900 dark:text-white"
                />


                <textarea
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                placeholder="Bio"
                className="border p-3 rounded h-32 dark:bg-gray-900 dark:text-white"
                />


                <input
                type="text"
                value={avatar}
                onChange={(e)=>setAvatar(e.target.value)}
                placeholder="Avatar URL"
                className="border p-3 rounded dark:bg-gray-900 dark:text-white"
                />


                <button
                className="bg-primary text-white p-3 rounded"
                >
                    Save Changes
                </button>

            </form>

        </div>
    )
}

export default EditProfile;