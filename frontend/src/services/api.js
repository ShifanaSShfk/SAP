const API_BASE_URL = "http://localhost:8080";
const API_URL = `${API_BASE_URL}/api/events`;

/**
 * Sends a student request to the backend.
 * @param {Object} data - The request data to be sent.
 * @returns {Promise<Object>} - The response from the server.
 */
export const sendStudentRequest = async (data) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(data).forEach((key) => {
      if (key === "proofFile" && data[key]) {
        // Append the file if it exists
        formData.append(key, data[key]);
      } else if (data[key]) {
        // Append other fields
        formData.append(key, data[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/requests/submit`, {
      method: "POST",
      body: formData, // Use FormData for file uploads
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit request");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting request:", error);
    throw error;
  }
};

/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The response from the server.
 */
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
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid Credentials");
    }

    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

/**
 * Adds a new event.
 * @param {Object} eventData - The event data to be added.
 * @returns {Promise<Object>} - The response from the server.
 */
export const addEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

/**
 * Fetches all events.
 * @returns {Promise<Array>} - The list of events.
 */
export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

/**
 * Fetches student details by ID.
 * @param {string} studentID - The ID of the student.
 * @returns {Promise<Object>} - The student details.
 */
export const fetchStudentDetails = async (studentID) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/students/${studentID}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching student details:", error);
    throw error;
  }
};