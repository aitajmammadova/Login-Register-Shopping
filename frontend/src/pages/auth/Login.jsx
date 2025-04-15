import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../services/AuthService";

const Login = () => {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })


    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        console.log(formData)
        try{
            const response=await login(formData)
            alert("Login successfully!")
            localStorage.setItem("token", response.token)
            navigate("/dashboard")

        }catch(error){
            console.error("Login failed", error.response)
            alert(error.response?.data?.error || "Invalid credentials. Please try again.");
        }
        setLoading(false)
    }
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
