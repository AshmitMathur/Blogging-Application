import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const NewsLetter = () => {
    const { axios } = useAppContext();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(
                "/api/newsletter/subscribe",
                { email }
            );
            if (data.success) {
                toast.success(data.message);
                setEmail("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
            <h1 className='md:text-4xl text-2xl font-semibold'>
                Never Miss A Blog
            </h1>
            <p className='md:text-lg text-gray-500/70 pb-8 dark:text-gray-200'>
                Subscribe to get the latest blog, new tech, and exclusive news.
            </p>
            <form
                className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
                onSubmit={handleSubmit}
            >
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter Your Mail Id"
                    required
                    className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500 dark:text-gray-200'
                />

                <button
                    disabled={loading}
                    type="submit"
                    className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none disabled:opacity-60 disabled:cursor-not-allowed'
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </button>
            </form>

        </div>
    );
};

export default NewsLetter;