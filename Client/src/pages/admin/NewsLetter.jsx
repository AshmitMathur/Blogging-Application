import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Newsletter = () => {
    const { axios } = useAppContext();

    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const filteredSubscribers = subscribers.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(search.toLowerCase())
    );

    const deleteSubscriber = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this subscriber?"
        );

        if (!confirmed) return;

        try {
            const { data } = await axios.delete(
                `/api/admin/newsletter/${id}`
            );

            if (data.success) {
                setSubscribers((prev) =>
                    prev.filter((subscriber) => subscriber._id !== id)
                );

                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };

    const fetchSubscribers = async () => {
        try {
            const { data } = await axios.get("/api/admin/newsletter");

            if (data.success) {
                setSubscribers(data.subscribers);
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

    useEffect(() => {
        fetchSubscribers();
    }, []);

    return (
        <div className="flex-1 min-h-screen p-4 md:p-10 bg-blue-50/50 dark:bg-gray-950">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Newsletter Subscribers
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage the users who have subscribed to your newsletter.
                </p>
            </div>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Subscribers
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-gray-800 dark:text-gray-100">
                        {subscribers.length}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Matching Results
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-gray-800 dark:text-gray-100">
                        {search ? filteredSubscribers.length : subscribers.length}
                    </p>
                </div>
            </div>

            <div className="mb-6 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search subscribers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
            </div>

            {loading ? (
                <div className="max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-sm p-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        Loading subscribers...
                    </p>
                </div>
            ) : subscribers.length === 0 ? (
                <div className="max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-sm p-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No subscribers yet.
                    </p>
                </div>
            ) : filteredSubscribers.length === 0 ? (
                <div className="max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-sm p-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No subscribers found matching your search.
                    </p>
                </div>
            ) : (
                <div className="relative max-w-5xl overflow-x-auto shadow-sm rounded-xl bg-white dark:bg-gray-800">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-600 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4">
                                    #
                                </th>

                                <th className="px-6 py-4">
                                    Email
                                </th>

                                <th className="px-6 py-4 hidden sm:table-cell">
                                    Subscribed At
                                </th>

                                <th className="px-6 py-4">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredSubscribers.map((subscriber, index) => (
                                <tr
                                    key={subscriber._id}
                                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                                        {subscriber.email}
                                    </td>

                                    <td className="px-6 py-4 hidden sm:table-cell whitespace-nowrap">
                                        {new Date(
                                            subscriber.subscribedAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                deleteSubscriber(subscriber._id)
                                            }
                                            className="px-3 py-1.5 rounded-md text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Newsletter;