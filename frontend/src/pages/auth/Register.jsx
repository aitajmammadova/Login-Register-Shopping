import { useState } from "react";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            await register(formData)
            alert("Registration successful! Check your email for activation.")
            navigate("/login")
        }catch(error){
            console.error("Registration failed",error.response)
        }
    }

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;