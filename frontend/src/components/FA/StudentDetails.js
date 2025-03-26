import React, { useState, useEffect } from "react";
import { fetchStudentsByFA } from "../../services/api";
import "../../styles/FA/StudentDetails.css";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [sortBy, setSortBy] = useState("Total Activity Points");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const facultyAdvisorId = localStorage.getItem("userId");
        if (!facultyAdvisorId) {
          throw new Error("Faculty Advisor ID not found in localStorage");
        }
        
        console.log("Fetching students for FA:", facultyAdvisorId);
        const response = await fetchStudentsByFA(facultyAdvisorId);
        console.log("API Response:", response);
        
        if (!Array.isArray(response)) {
          throw new Error("Invalid response format from API");
        }
        
        // Ensure studentName exists in each student object
        const validatedStudents = response.map(student => ({
          ...student,
          studentName: student.studentName || 'Unknown' // Fallback if name is missing
        }));
        
        setStudents(validatedStudents);
        setError(null);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "Total Activity Points") {
      return b.totalPoints - a.totalPoints;
    } else if (sortBy === "Department Activity Points") {
      return b.departmentPoints - a.departmentPoints;
    } else if (sortBy === "Institute Activity Points") {
      return b.institutionalPoints - a.institutionalPoints;
    }
    return 0;
  });

  if (loading) return <div className="loading">Loading student details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (students.length === 0) return <div>No students found under your supervision.</div>;

  return (
    <div className="student-list-container">
      <header className="student-list-header">
        <h2>Student Details</h2>
        <div className="sort-options">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="Total Activity Points">Total Activity Points</option>
            <option value="Department Activity Points">Department Activity Points</option>
            <option value="Institute Activity Points">Institute Activity Points</option>
          </select>
        </div>
      </header>
      
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Institute Points</th>
            <th>Department Points</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td className="student-name-cell">{student.studentName}</td>
              <td className={student.institutionalPoints < 20 ? "low" : ""}>
                {student.institutionalPoints}
              </td>
              <td className={student.departmentPoints < 20 ? "low" : ""}>
                {student.departmentPoints}
              </td>
              <td className={student.totalPoints < 40 ? "low" : "high"}>
                {student.totalPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;