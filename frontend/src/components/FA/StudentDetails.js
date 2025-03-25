import React, { useState } from "react";
import "../../styles/StudentDetails.css";

const StudentList = () => {
  const [sortBy, setSortBy] = useState("Total Activity Points");

  const students = [
    { name: "Shifana S Shafeek", institutePoints: 10, deptPoints: 40 },
    { name: "Ravipati Nikitha Chawadary", institutePoints: 20, deptPoints: 25 },
    { name: "Sreedevi K", institutePoints: 10, deptPoints: 15 },
    { name: "Prithwiraj", institutePoints: 5, deptPoints: 35 },
    { name: "Sukumar", institutePoints: 5, deptPoints: 5 },
    { name: "Charlie", institutePoints: 55, deptPoints: 5 },
    { name: "Robert", institutePoints: 20, deptPoints: 25 },
    { name: "Ashley", institutePoints: 15, deptPoints: 35 },
    { name: "Trisha", institutePoints: 10, deptPoints: 25 },
  ];

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "Total Activity Points") {
      return (
        b.institutePoints + b.deptPoints - (a.institutePoints + a.deptPoints)
      );
    } else if (sortBy === "Department Activity Points") {
      return b.deptPoints - a.deptPoints;
    } else if (sortBy === "Institute Activity Points") {
      return b.institutePoints - a.institutePoints;
    }
    return 0;
  });

  return (
    <div className="student-list-container">
      <header className="student-list-header">
       
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
              <td>{student.name}</td>
              <td className={student.institutePoints < 20 ? "low" : ""}>
                {student.institutePoints}
              </td>
              <td className={student.deptPoints < 20 ? "low" : ""}>
                {student.deptPoints}
              </td>
              <td className={student.institutePoints + student.deptPoints < 40 ? "low" : "high"}>
                {student.institutePoints + student.deptPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
