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

export const fetchFacultyDetails = async (facultyID) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/faculty/${facultyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      },
    });

    const data = await handleResponse(response);
    return {
      id: data.facultyId,
      name: data.facultyName,
      department: data.department,
      designation: data.designation,
      facultyRoom: data.facultyRoom,
      email: data.email,
      isFacultyAdvisor: data.isFacultyAdvisor
    };
  } catch (error) {
    console.error("Error fetching faculty details:", error);
    throw error;
  }
};


export const fetchEventsByDate = async (year, month) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events/by-date?year=${year}&month=${month}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchFacultyEvents = async (facultyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events/faculty/${facultyId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching faculty events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      },
      body: JSON.stringify(eventData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * Fetches requests for a faculty member (where they are in charge)
 * @param {string} facultyId - The faculty member's ID
 * @returns {Promise<Array>} - List of requests
 */
export const fetchFacultyRequests = async (facultyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/requests/faculty/${facultyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    const data = await handleResponse(response);
    
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format from server");
    }
    
    return data.map(request => ({
      request_id: request.request_id,
      event_name: request.event_name || "Untitled Event",
      status: request.status || "Pending",
      student_id: request.student_id,
      student_name: request.student_name || "Unknown Student",
      department: request.department || "N/A",
      section: request.section || "N/A",
      event_date: request.event_date,
      event_time: request.event_time,
      location: request.location || "Location not specified",
      activity_points: request.activity_points || 0,
      proof_document: request.proof_document
    }));
  } catch (error) {
    console.error("Error fetching faculty requests:", error);
    throw error;
  }
};

export const approveRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
};

export const rejectRequest = async (requestId, reason) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/reject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      },
      body: JSON.stringify({ reason })
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

/**
 * Fetches details of a specific request
 * @param {string} requestId - The ID of the request to fetch
 * @returns {Promise<Object>} - The request details
 */
export const fetchRequestDetails = async (requestId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
    
    const data = await handleResponse(response);
    return {
      request_id: data.request_id,
      event_name: data.event_name,
      status: data.status,
      student_name: data.student_name,
      student_id: data.student_id,
      department: data.department,
      section: data.section,
      event_date: data.event_date,
      event_time: data.event_time,
      location: data.location,
      activity_points: data.activity_points,
      proof_document: data.proof_document,
      rejection_reason: data.rejection_reason || ''
    };
  } catch (error) {
    console.error("Error fetching request details:", error);
    throw error;
  }
};

// api.js
export const fetchStudentsByFA = async (facultyAdvisorId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/api/students/by-fa/${facultyAdvisorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await handleResponse(response);
    console.log('Students under FA:', data);
    
    return Array.isArray(data) ? data.map(student => ({
      studentId: student.studentId,
      studentName: student.studentName,
      // department: student.department,
      // section: student.section,
      institutionalPoints: student.institutionalPoints || 0,
      departmentPoints: student.departmentPoints || 0,
      totalPoints: student.totalPoints || 0
    })) : [];
  } catch (error) {
    console.error("Error fetching students by FA:", error);
    throw error;
  }
};

export const fetchStudentRequests = async (studentId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/api/requests/student/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format from server");
    }
    
    // Sort by createdAt (newest first)
    return data.map(request => ({
      request_id: request.request_id || request.requestId,
      event_name: request.event_name || request.eventName,
      status: request.status || "Pending",
      event_date: request.event_date || request.eventDate,
      activity_points: request.activity_points || request.activityPoints,
      rejection_reason: request.rejection_reason || null,
      created_at: request.created_at || request.createdAt
    })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error("Error fetching student requests:", error);
    throw error;
  }
};