//import axios from 'axios';

export const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid Credentials"); // ❌ Causes error if API returns 401
      }
  
      return await response.json();
    } catch (error) {
      console.error("Login Error:", error);
      throw error; // Propagate error to `Login.js`
    }
  };
  