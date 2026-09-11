import React, { useState } from 'react';
import { assets } from '../../Assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
    const { blog, createdAt, _id } = comment;
const { axios } = useAppContext();

const [approveLoading, setApproveLoading] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);

const BlogDate = new Date(createdAt);

const approveComment = async () => {
    setApproveLoading(true);

    try {
        const { data } = await axios.post(
            "/api/admin/approve-comment",
            { id: _id }
        );

        if (data.success) {
            toast.success(data.message);
            await fetchComments();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(
            error.response?.data?.message || error.message
        );
    } finally {
        setApproveLoading(false);
    }
};

const deleteComment = async () => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    setDeleteLoading(true);

    try {
        const { data } = await axios.post(
            "/api/admin/delete-comment",
            { id: _id }
        );

        if (data.success) {
            toast.success(data.message);
            await fetchComments();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(
            error.response?.data?.message || error.message
        );
    } finally {
        setDeleteLoading(false);
    }
};

    return (
        <tr className='border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50/50 dark:hover:bg-gray-700/40 transition-colors duration-200'>
            <td className='px-6 py-5'>
                <div className='max-w-xl space-y-1'>
                    <p className='font-medium text-gray-800 dark:text-gray-100'>
                        {blog?.title || "Deleted Blog"}
                    </p>

                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        By{' '}
                        <span className='font-medium text-gray-700 dark:text-gray-300'>
                            {comment.name}
                        </span>
                    </p>

                    <p className='text-sm leading-6 text-gray-600 dark:text-gray-300'>
                        {comment.content}
                    </p>
                </div>
            </td>

            <td className='px-6 py-5 hidden sm:table-cell whitespace-nowrap text-gray-500 dark:text-gray-400'>
                {BlogDate.toLocaleDateString()}
            </td>

            <td className='px-6 py-5'>
                <div className='flex items-center gap-3'>
                    {!comment.isApproved ? (
<button
    onClick={approveComment}
    title='Approve comment'
    disabled={approveLoading || deleteLoading}
    className='flex items-center justify-center w-9 h-9 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-all duration-200 cursor-pointer hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
>
    {approveLoading ? (
        <div className='w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin'></div>
    ) : (
        <img
            src={assets.tick_icon}
            alt='Approve'
            className='w-4 h-4'
        />
    )}
</button>
                    ) : (
                        <span className='text-xs font-medium border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1 dark:bg-green-900/30 dark:text-green-400'>
                            Approved
                        </span>
                    )}
<button
    onClick={deleteComment}
    title='Delete comment'
    disabled={deleteLoading || approveLoading}
    className='flex items-center justify-center w-9 h-9 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 cursor-pointer hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
>
    {deleteLoading ? (
        <div className='w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>
    ) : (
        <img
            src={assets.bin_icon}
            alt='Delete'
            className='w-4 h-4'
        />
    )}
</button>
                </div>
            </td>
        </tr>
    );
};

export default CommentTableItem;