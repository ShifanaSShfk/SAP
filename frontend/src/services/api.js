import axios from 'axios';

const API_BASE_URL = "http://localhost:3000"; // Change this to your backend URL

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};
