import React, { useEffect, useState } from 'react';
import CommentTableItem from './CommentTableItem';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState('Not Approved');
    const [loading, setLoading] = useState(true);

    const { axios } = useAppContext();

    const fetchComments = async () => {
        try {
            const { data } = await axios.get("/api/admin/comments");

            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const filteredComments = comments.filter((comment) => {
        if (filter === 'Approved') {
            return comment.isApproved === true;
        }

        return comment.isApproved === false;
    });

    return (
        <div className='flex-1 min-h-screen p-4 md:p-10 bg-blue-50/50 dark:bg-gray-950'>
            <div className='flex flex-col gap-4 mb-6 max-w-5xl sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
                        Comments
                    </h1>
                    <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                        Review and manage comments on your blogs.
                    </p>
                </div>

                <div className='flex gap-2'>
                    {['Approved', 'Not Approved'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-2 rounded-full text-xs font-medium border cursor-pointer transition-all ${
                                filter === item
                                    ? 'bg-primary text-white border-primary shadow-sm'
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-primary dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                            }`}
                        >
                            {item === 'Not Approved' ? 'Pending' : item}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className='max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-sm p-10 text-center'>
                    <div className='flex flex-col items-center gap-3'>
                        <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Loading comments...
                        </p>
                    </div>
                </div>
            ) : filteredComments.length === 0 ? (
                <div className='max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-sm p-10 text-center'>
                    <p className='text-gray-500 dark:text-gray-400'>
                        No {filter === 'Approved' ? 'approved' : 'pending'} comments found.
                    </p>
                </div>
            ) : (
                <div className='relative max-w-5xl overflow-x-auto rounded-xl shadow-sm scrollbar-hide bg-white dark:bg-gray-800'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-600 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50'>
                            <tr>
                                <th className='px-6 py-4'>
                                    Blog & Comment
                                </th>
                                <th className='px-6 py-4 hidden sm:table-cell'>
                                    Date
                                </th>
                                <th className='px-6 py-4'>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredComments.map((comment) => (
                                <CommentTableItem
                                    key={comment._id}
                                    comment={comment}
                                    fetchComments={fetchComments}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Comments;