const API_BASE_URL = "http://localhost:8080";
const API_URL = `${API_BASE_URL}/api/events`;

// Helper function for API responses
const handleResponse = async (response) => {
  try {
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return response.text(); // Handle non-JSON responses
    }
  } catch (error) {
    console.error("Error processing response:", error);
    throw error;
  }
};

/**
 * Logs in a user.
 * @param {string} id - The user's ID.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The response from the server.
 */
export const loginUser = async (id, password) => {
  try {
    console.log('Attempting login with:', { id, password });
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        id: id.trim(),
        password: password
      }),
    });

    console.log('Login response status:', response.status);

    const data = await response.json();
    console.log('Parsed response data:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Invalid credentials');
    }

    // Store user data
    const userData = {
      userId: data.id || '',
      role: data.role || '',
      username: data.email ? data.email.split('@')[0] : id,
      isFacultyAdvisor: data.role === 'faculty' ? Boolean(data.isFacultyAdvisor) : false
    };

    // Save to localStorage
    localStorage.setItem("userId", userData.userId);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("username", userData.username);
    
    if (userData.role === "faculty") {
      localStorage.setItem("isFacultyAdvisor", userData.isFacultyAdvisor);
    }

    console.log('Login successful. Stored data:', userData);
    return userData;

  } catch (error) {
    console.error("Login Error:", error);
    // Clear auth data on failure
    ['userId', 'role', 'username', 'isFacultyAdvisor'].forEach(
      key => localStorage.removeItem(key)
    );
    throw new Error(error.message || 'Login failed. Please check your credentials.');
  }
};

// ... rest of your api.js file remains the same ...
/**
 * Sends a student request to the backend.
 * @param {Object} data - The request data to be sent.
 * @returns {Promise<Object>} - The response from the server.
 */
export const sendStudentRequest = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/requests/submit`, {
      method: "POST",
      body: formData,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error submitting request:", error);
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
    const token = localStorage.getItem("authToken");

    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(eventData),
    });

    return handleResponse(response);
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

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// ... (keep existing imports and helper functions)

// Update your fetchStudentDetails function:
export const fetchStudentDetails = async (studentID) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/api/students/${studentID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await handleResponse(response);
    console.log('Raw student data from API:', data); // For debugging
    
    return {
      studentId: data.studentId,
      studentName: data.studentName,
      department: data.department,
      section: data.section,
      email: data.email,
      contactNumber: data.contactNumber,
      facultyAdvisorId: data.facultyAdvisorId,
      institutionalPoints: data.institutionalPoints || 0,
      departmentPoints: data.departmentPoints || 0,
      totalPoints: data.totalPoints || 0
    };
  } catch (error) {
    console.error("Error fetching student details:", error);
    throw error;
  }
};

// Update your fetchFacultyDetails function:
export const fetchFacultyDetails = async (facultyID) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/api/faculty/${facultyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await handleResponse(response);
    console.log('Raw faculty data from API:', data); // For debugging
    
    return {
      id: data.id,
      name: data.name || data.facultyName, // Try both possible field names
      department: data.department,
      isFacultyAdvisor: data.isFacultyAdvisor || false
    };
  } catch (error) {
    console.error("Error fetching faculty details:", error);
    throw error;
  }
};
