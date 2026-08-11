import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import Navbar from "../components/NavBar.jsx";
import Footer from "../../../components/Footer.jsx";
import toast from "react-hot-toast";
import { parse } from "marked";
import { blogCategories } from "../../../Assets/assets.js";


const WriteBlog = () => {
    const { axios } = useAppContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
    if (!quillRef.current && editorRef.current) {
        quillRef.current = new Quill(editorRef.current, {
            theme: "snow",
        });
    }
}, []);

const generateContent = async () => {
    if (!title) {
        return toast.error("Please enter a Title");
    }

    try {
        setIsGenerating(true);

        const { data } = await axios.post(
            "/api/blog/generate",
            {
                prompt: title,
            }
        );

        if (data.success) {
            quillRef.current.root.innerHTML = parse(data.content);
            toast.success("Content generated successfully");
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        toast.error(
            error.response?.data?.message || error.message
        );
    } finally {
        setIsGenerating(false);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();

const description = quillRef.current?.root.innerHTML || "";

if (
    !title.trim()  || !category.trim() ||
    !description.replace(/<(.|\n)*?>/g, "").trim()
) {
    toast.error("Title, description and category are required");
    return;
}

    if (!image) {
        toast.error("Please select a cover image");
        return;
    }

    try {
        setLoading(true);

        const formData = new FormData();

        formData.append(
            "blog",
            JSON.stringify({
                title,
                subTitle,
                description,
                category,
                isPublished: true
            })
        );

        formData.append("image", image);

        const { data } = await axios.post(
            "/api/blog/add",
            formData
        );

        if (data.success) {
            toast.success(data.message);

            setTitle("");
            setSubTitle("");
            setCategory("");
            setImage(null);

            if (quillRef.current) {
    quillRef.current.root.innerHTML = "";
                }

            navigate("/");
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
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto py-12 px-5">
                <h1 className="text-3xl font-bold mb-2 dark:text-white">
                    Write a Blog
                </h1>
                <p className="text-gray-500 mb-8">
                    Share your thoughts with the community.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >
                    {/* Title */}
                    <div>
                        <label className="block font-medium mb-2 dark:text-gray-300">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your blog title"
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
                            required
                        />
                    </div>
                    {/* Subtitle */}
                    <div>
                        <label className="block font-medium mb-2 dark:text-gray-300">
                            Subtitle
                        </label>

                        <input
                            type="text"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            placeholder="Enter a subtitle"
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
                        />
                    </div>


                    {/* Image */}
                    <div>
                        <label className="block font-medium mb-2 dark:text-gray-300">
                            Cover Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300"
                        />

                        {image && (
                            <p className="mt-2 text-sm text-gray-500">
                                Selected: {image.name}
                            </p>
                        )}
                    </div>

                    {/* Content */}
<div>

    <div className="flex items-center justify-between mb-2">

        <label className="font-medium dark:text-gray-300">
            Content
        </label>
        <button
            type="button"
            onClick={generateContent}
            disabled={isGenerating}
            className="
                px-4 py-2
                bg-primary
                text-white
                rounded-lg
                text-sm
                font-medium
                cursor-pointer
                hover:bg-primary/90
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
        >
            {isGenerating
                ? "Generating..."
                : "✨ Generate with AI"}
        </button>

    </div>

    <div className="w-full max-w-3xl">
        <div
            ref={editorRef}
            className="
                min-h-72
                bg-white
                dark:bg-zinc-900
                dark:text-white
            "
        ></div>
    </div>

</div>

                    {/* Category */}
<div>
    <label className="block font-medium mb-2 dark:text-gray-300">
        Category
    </label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-2 px-3 py-2 border border-gray-300 rounded text-gray-500 dark:bg-gray-700 dark:text-gray-300
                    cursor-pointer"
                >
                    {blogCategories.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
</div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-fit bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Publishing..." : "Publish Blog"}
                    </button>

                </form>
            </div>

            <Footer />
        </>
    );
};



export default WriteBlog;