import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import BlogForm from "./BlogForm";
import Loader from "../../components/Loader";

const EditBlog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();

    const [blog, setBlog] = useState(null);


    const fetchBlog = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            if(data.success){
                setBlog(data.blog);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if(!blog){
        return <Loader/>
    }
    return (
            <BlogForm
            mode="edit"
            initialData={blog}
            blogId={id}
        />
    );
};

export default EditBlog;