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
        <div className="flex flex-col items-center justify-center text-center space-y-3 my-32 px-4">

            <h1 className="md:text-4xl text-2xl font-semibold dark:text-gray-100">
                Never Miss A <span className="text-primary dark:text-primary">Blog</span>
            </h1>

            <p className="md:text-lg text-gray-500/70 dark:text-gray-300 pb-6 max-w-xl">
                Subscribe to get the latest blogs, new tech, and exclusive news.
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex items-center max-w-2xl w-full md:h-13 h-12"
            >

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                    className=" border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200  placeholder-gray-400 dark:placeholder-gray-500 rounded-l-md h-full outline-none w-full px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 transition disabled:opacity-60
                    "
                />
                <button
                    disabled={loading}
                    type="submit"
                    className=" md:px-12 px-7 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-r-md disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </button>

            </form>

        </div>
    );
};

export default NewsLetter;