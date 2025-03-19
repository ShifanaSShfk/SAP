const API_BASE_URL = "http://localhost:8080"; // ✅ Update to match backend

// 🔹 Login function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

// 🔹 Function to send student request
export const sendStudentRequest = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const response = await fetch(`${API_BASE_URL}/api/requests/submit`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit request");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting request:", error);
    throw error;
  }
};
