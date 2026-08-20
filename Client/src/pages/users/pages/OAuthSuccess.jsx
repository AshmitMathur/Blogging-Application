import React, { useEffect } from "react";
import { useAppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";

const OAuthSuccess = () => {

    const {
        setAuthToken,
        fetchCurrentUser,
        fetchMyBlogs,
        navigate
    } = useAppContext();
    useEffect(() => {
        const handleOAuthSuccess = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");
            if (!token) {
                toast.error("Google authentication failed");
                navigate("/login");
                return;
            }
            try {
                setAuthToken(token);
                await fetchCurrentUser();
                await fetchMyBlogs();
                navigate("/");
            } catch (error) {
                console.error("OAuth Success Error:", error);
                toast.error("Unable to complete Google login");
                setAuthToken(null);
                navigate("/login");
            }
        };
        handleOAuthSuccess();
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
            <div className="text-center">
                <div className="text-3xl mb-3">
                    🔐
                </div>
                <h2 className="text-xl font-semibold dark:text-white">
                    Signing you in...
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Please wait while we complete authentication.
                </p>
            </div>
        </div>
    );
};
export default OAuthSuccess;