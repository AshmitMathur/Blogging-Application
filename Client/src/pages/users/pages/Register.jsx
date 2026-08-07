import React, {useState} from "react";
import {useAppContext} from "../../../../context/AppContext";
import toast from "react-hot-toast";

const Register = ()=> {
    const { axios, navigate, setToken, setUser} = useAppContext();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const {data} = await axios.post(
                "/api/auth/register",
                formData
            );
            if(data.success){
                toast.success(data.message);

                localStorage.setItem(
                    "token",
                    data.token
                );
                setToken(data.token);
                setUser(data.user);

                axios.defaults.headers.common["Authorization"] = data.token;

                
                navigate("/");
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    };

        return (
        <form onSubmit={handleSubmit}>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <button>
                Register
            </button>

        </form>
    );
};

export default Register;