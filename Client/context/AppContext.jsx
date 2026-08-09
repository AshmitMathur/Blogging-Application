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

    const removeBlog = (blogId) => {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
        setmyBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    }

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
        removeBlog
    };




    useEffect(()=> {
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;

            fetchCurrentUser();
            fetchMyBlogs();
        }
    }, [])

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}
