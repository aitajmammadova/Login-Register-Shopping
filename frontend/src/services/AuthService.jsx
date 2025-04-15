import axios from "axios"


const API_URL ="http://127.0.0.1:8000/auth/"

export const register=async(userData)=>{
    const response=await axios.post(`${API_URL}register/`,userData)
}

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}login/`, userData);
    return response.data;
};
export const getUser = async (token) => {
    const response = await axios.get(`${API_URL}auth/user/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};