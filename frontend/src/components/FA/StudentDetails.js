import React, { useState, useEffect } from "react";
import { fetchStudentDetails } from "../../services/api";
import "../../styles/StudentDetails.css";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [sortBy, setSortBy] = useState("Total Activity Points");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // This should be replaced with your actual API endpoint
        const response = await fetchStudentDetails("all"); // Or use specific FA endpoint
        setStudents(response.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "Total Activity Points") {
      return (
        b.institutionalPoints + b.departmentPoints - 
        (a.institutionalPoints + a.departmentPoints)
      );
    } else if (sortBy === "Department Activity Points") {
      return b.departmentPoints - a.departmentPoints;
    } else if (sortBy === "Institute Activity Points") {
      return b.institutionalPoints - a.institutionalPoints;
    }
    return 0;
  });

  if (loading) return <div>Loading student details...</div>;

  return (
    <div className="student-list-container">
      <header className="student-list-header">
        <h2>Student Details</h2>
        <div className="sort-options">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Total Activity Points">Total Activity Points</option>
            <option value="Department Activity Points">Department Activity Points</option>
            <option value="Institute Activity Points">Institute Activity Points</option>
          </select>
        </div>
      </header>
      
      <table className="student-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Institute Activity Points</th>
            <th>Department Activity Points</th>
            <th>Total Activity Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.studentName}</td>
              <td className={student.institutionalPoints < 20 ? "low" : ""}>
                {student.institutionalPoints}
              </td>
              <td className={student.departmentPoints < 20 ? "low" : ""}>
                {student.departmentPoints}
              </td>
              <td className={
                student.institutionalPoints + student.departmentPoints < 40 
                  ? "low" 
                  : "high"
              }>
                {student.institutionalPoints + student.departmentPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;