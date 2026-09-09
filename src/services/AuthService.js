import axios from "axios";

const API_URL = "https://localhost:7112/api/Auth";


const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        
     
        if (response.data && response.data.status === 200) {
            const token = response.data.data;
       
            localStorage.setItem("token", token); 
            return response.data;
        } else {
            throw new Error(response.data?.message || "Login failed.");
        }
    } catch (error) {
        
        const errorMsg = error.response?.data?.message || "Invalid Username or Password!";
        throw new Error(errorMsg);
    }
};

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
    login,
    logout,
    getAuthHeader
};