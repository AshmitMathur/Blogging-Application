import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import BlogForm from "./BlogForm";
import Loader from "../../components/Loader";

const EditBlog = () => {
    const { id } = useParams();
    const location = useLocation();
    const { axios } = useAppContext();

    const [blog, setBlog] = useState(null);
    const [error, setError] = useState("");

    const fetchBlog = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);

            if (data.success) {
                setBlog(data.blog);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if (error) {
        return (
            <div className='flex-1 min-h-screen flex items-center justify-center bg-blue-50/50 dark:bg-gray-950'>
                <div className='text-center'>
                    <p className='text-red-500 font-medium'>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return <Loader />;
    }

    const isAdminEdit = location.pathname.startsWith("/admin");

    return (
        <BlogForm
            mode='edit'
            initialData={blog}
            blogId={id}
            redirectTo={isAdminEdit ? "/admin/listblog" : "/"}
        />
    );
};

export default EditBlog;