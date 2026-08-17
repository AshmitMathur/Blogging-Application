import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../Assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const BlogForm = ({ mode = "add", initialData = null, blogId, redirectTo }) => {
    const { axios, navigate, fetchBlogs, fetchMyBlogs, isAdmin } = useAppContext();

    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const imageInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("");
    const [isPublished, setIsPublished] = useState(false);

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
                    if (!isAdmin) await fetchMyBlogs();
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
        <form
            onSubmit={onSubmitHandler}
            className="flex-1 min-h-screen bg-blue-50/50 dark:bg-gray-950 px-4 py-6 sm:px-8 sm:py-10 lg:px-12"
        >
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        {mode === "add" ? "Create New Blog" : "Update Blog"}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {mode === "add"
                            ? "Create and publish a new blog post."
                            : "Update the details of your blog post."}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900 sm:p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Blog Thumbnail
                            </label>

                            <label
                                htmlFor="image"
                                className="mt-3 flex h-40 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-primary hover:bg-blue-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary dark:hover:bg-gray-800/70"
                            >
                                <img
                                    src={
                                        image
                                            ? URL.createObjectURL(image)
                                            : existingImage || assets.upload_area
                                    }
                                    alt="Blog thumbnail"
                                    className="h-full w-full object-contain p-3"
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

                            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                Click the box above to upload a thumbnail image.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Blog Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your blog title"
                                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="subtitle"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Sub Title
                            </label>

                            <input
                                id="subtitle"
                                type="text"
                                required
                                value={subTitle}
                                onChange={(e) => setSubTitle(e.target.value)}
                                placeholder="Enter a short description"
                                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Blog Description
                                </label>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    Write your content below
                                </span>
                            </div>

                            <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
                                <div
                                    ref={editorRef}
                                    className="min-h-[280px]"
                                />

                                {loading && (
                                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-900/70">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Generating content...
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end border-t border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={generateContent}
                                        className="rounded-md bg-gray-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                        {loading ? "Generating..." : "Generate With AI"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Blog Category
                                </label>

                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="" disabled>
                                        Select a Category
                                    </option>

                                    {blogCategories.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center">
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                                    <input
                                        type="checkbox"
                                        checked={isPublished}
                                        onChange={(e) => setIsPublished(e.target.checked)}
                                        className="h-4 w-4 cursor-pointer accent-primary"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Publish Now
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            Make this blog visible immediately
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={isAdding}
                                className="min-w-40 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
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
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BlogForm;