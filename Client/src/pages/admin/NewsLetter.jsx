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

    if (!confirmed) {
        return;
    }
    try {
        const { data } = await axios.delete(
            `/api/admin/newsletter/${id}`
        );

        if (data.success) {
            setSubscribers((prev) =>
                prev.filter(
                    (subscriber) => subscriber._id !== id
                )
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
        <div className="flex-1 min-h-screen mt-4 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-gray-950">
<div className="mb-8">
    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Newsletter Subscribers
    </h1>

    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Manage the users who have subscribed to your newsletter.
    </p>
</div>
<div className="mb-6 w-full sm:w-64 bg-white dark:bg-gray-800 rounded-lg shadow p-5">
    <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Subscribers
    </p>

    <p className="mt-1 text-3xl font-semibold text-gray-800 dark:text-gray-100">
        {subscribers.length}
    </p>
</div>

<div className="mb-5 max-w-md">
    <input
        type="text"
        placeholder="Search subscribers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800  text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition
        "
    />
</div>

            {loading ? (
                <p className="m-2 dark:text-gray-300">
                    Loading subscribers...
                </p>
            ) : subscribers.length === 0 ? (
    <p className="m-2 dark:text-gray-300">
        No subscribers yet.
    </p>
) : filteredSubscribers.length === 0 ? (
    <p className="m-2 dark:text-gray-300">
        No subscribers found.
    </p>
) : (
                <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white dark:bg-gray-700">

                    <table className="w-full text-sm text-left text-gray-500">

                        <thead className="text-xs text-gray-600 uppercase">
                            <tr>
                                <th className="px-6 py-4 dark:text-gray-200">
                                    #
                                </th>

                                <th className="px-6 py-4 dark:text-gray-200">
                                    Email
                                </th>

                                <th className="px-6 py-4 dark:text-gray-200">
                                    Subscribed At
                                </th>

                                <th className="px-6 py-4 dark:text-gray-200">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredSubscribers.map((subscriber, index) => (
                                <tr
                                    key={subscriber._id}
                                    className="border-t border-gray-200 dark:border-gray-600"
                                >
                                    <td className="px-6 py-4 dark:text-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 dark:text-gray-200">
                                        {subscriber.email}
                                    </td>
                                    <td className="px-6 py-4 dark:text-gray-200">
                                        {new Date(
                                            subscriber.subscribedAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
<button
    onClick={() => deleteSubscriber(subscriber._id)}
    className="text-red-500 hover:underline cursor-pointer"
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