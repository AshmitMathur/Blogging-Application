import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const AppContext = createContext();

export const AppProvider = ({children}) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState(null);
    const [myBlogs, setmyBlogs] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    
    const removeBlog = (blogId) => {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
        setmyBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    }

const logout = () => {

    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    setToken(null);
    setUser(null);
    setIsAdmin(false);
    setmyBlogs([]);
    navigate("/");
};

    const fetchBlogs = async()=> {
        try {
           const {data} =  await axios.get("/api/blog/all");
           data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchCurrentUser = async()=> {
        try {
            const {data} = await axios.get("/api/auth/me");

            if(data.success){
                setUser(data.user);
            }
            else{
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    }

    const fetchMyBlogs = async() => {
        try {
            const { data} = await axios.get("/api/blog/my-blogs");
            if(data.success){
                setmyBlogs(data.blogs);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput, 
        user, setUser, fetchCurrentUser, myBlogs, setmyBlogs, fetchMyBlogs, 
        removeBlog, isAdmin, setIsAdmin, logout, fetchBlogs, authLoading
    };

useEffect(() => {
    const initializeApp = async () => {
        fetchBlogs();
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setToken(null);
            setUser(null);
            setIsAdmin(false);
            delete axios.defaults.headers.common["Authorization"];

            setAuthLoading(false);
            return;
        }
        try {
            const payload = JSON.parse(
                atob(storedToken.split(".")[1])
            );
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] =
                storedToken;
            if (payload.role === "admin") {
                setIsAdmin(true);
                setUser(null);
            }
            else if (payload.role === "user") {
                setIsAdmin(false);
                await fetchCurrentUser();
                await fetchMyBlogs();
            }
            else {
                setIsAdmin(false);
                setUser(null);
            }
        } catch (error) {
            console.log("Invalid token:", error);
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            setToken(null);
            setUser(null);
            setIsAdmin(false);
            setmyBlogs([]);
        }

        setAuthLoading(false);
    };
    initializeApp();
}, []);

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}
