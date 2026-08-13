import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../Assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";
import { useTheme } from "../../../context/ThemeContext";

const BlogForm = ({ mode = "add", initialData = null, blogId, redirectTo }) => {
    const { axios, navigate, fetchBlogs, fetchMyBlogs } = useAppContext();

    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const imageInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("Startup");
    const [isPublished, setIsPublished] = useState(false);
    const {theme, toggleTheme} = useTheme();

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
            });
        }
    }, []);

    useEffect(() => {
        if (!initialData || !quillRef.current) return;

        setTitle(initialData.title);
        setSubTitle(initialData.subTitle);
        setCategory(initialData.category);
        setIsPublished(initialData.isPublished);
        setExistingImage(initialData.image);

        quillRef.current.root.innerHTML = initialData.description;
    }, [initialData]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (mode === "add" && !image) {
            toast.error("Please select an image.");
            return;
        }

        try {
            setIsAdding(true);

            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
                isPublished,
            };

            const formData = new FormData();
            formData.append("blog", JSON.stringify(blog));

            if (image) {
                formData.append("image", image);
            }

            let data;

            if (mode === "add") {
                const response = await axios.post("/api/blog/add", formData);
                data = response.data;
            } else {
                const response = await axios.put(
                    `/api/blog/update/${blogId}`,
                    formData
                );
                data = response.data;
            }

            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
                
                if (mode === "edit") {
                    
                    await fetchMyBlogs();
                    navigate(redirectTo);
                    return;
                }
                setImage(null);
                setExistingImage("");
                setTitle("");
                setSubTitle("");
                setCategory("Startup");
                setIsPublished(false);

                if (quillRef.current) {
                    quillRef.current.root.innerHTML = "";
                }

                if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);

            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsAdding(false);
        }
    };

    const generateContent = async () => {
        if (!title) return toast.error("Please enter a Title");

        try {
            setLoading(true);

            const { data } = await axios.post("/api/blog/generate", {
                prompt: title,
            });

            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <form
            onSubmit={onSubmitHandler}
className=" w-full overflow-y-auto flex justify-center items-start
 bg-gradient-to-br from-gray-50 via-white to-blue-50
 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900
 text-gray-700 dark:text-gray-300
  px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14
 transition-colors duration-300
"
        >
            <div className="        bg-white
        w-full
        max-w-3xl
        p-4
        md:p-10
        shadow
        rounded-xl
        dark:bg-gray-900">
                <p className="dark:text-gray-300">Upload Thumbnail</p>

                <label htmlFor="image">
                    <img
                        src={
                            image
                                ? URL.createObjectURL(image)
                                : existingImage || assets.upload_area
                        }
                        alt=""
                        className="mt-2 h-16 rounded cursor-pointer"
                    />

                    <input
                        ref={imageInputRef}
                        id="image"
                        type="file"
                        hidden
                        required={mode === "add"}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>

                <p className="mt-4 dark:text-gray-300">Blog Title</p>

                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Type here"
                    className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded dark:text-gray-300"
                />

                <p className="mt-4 dark:text-gray-300">Sub Title</p>

                <input
                    type="text"
                    required
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="Type here"
                    className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded dark:text-gray-300"
                />

                <p className="mt-4 dark:text-gray-300">Blog Description</p>

                <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
                    <div ref={editorRef}></div>

                    {loading && (
                        <div className="absolute inset-0 z-50 bg-gray-200/50 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={generateContent}
                        className="absolute bottom-1 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded cursor-pointer"
                    >
                        Generate With AI
                    </button>
                </div>

                <p className="mt-4 dark:text-gray-300">Blog Category</p>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-2 px-3 py-2 border border-gray-300 rounded text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                >
                    {blogCategories.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2 mt-4">
                    <p className="dark:text-gray-300">Publish Now</p>

                    <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="scale-125 cursor-pointer"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isAdding}
                    className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer disabled:opacity-50 hover:scale-105 transition-all"
                >
                    {isAdding
                        ? mode === "add"
                            ? "Adding..."
                            : "Updating..."
                        : mode === "add"
                        ? "Add Blog"
                        : "Update Blog"}
                </button>
            </div>
        </form>
</>
    );
};
export default BlogForm;