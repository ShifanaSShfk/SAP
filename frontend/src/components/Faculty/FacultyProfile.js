import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFacultyDetails } from '../../services/api';
import '../../styles/profile.css';

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const loadFacultyData = async () => {
      try {
        const facultyId = localStorage.getItem('userId');
        if (!facultyId) {
          throw new Error('Faculty ID not found');
        }

        const facultyData = await fetchFacultyDetails(facultyId);
        console.log('Fetched faculty data:', facultyData);
        setFaculty(facultyData);

        // Store faculty data in localStorage
        localStorage.setItem('facultyName', facultyData.name || '');
        localStorage.setItem('facultyId', facultyData.id || '');
        localStorage.setItem('department', facultyData.department || '');
        localStorage.setItem('designation', facultyData.designation || '');
        localStorage.setItem('isFacultyAdvisor', facultyData.isFacultyAdvisor || 'false');

      } catch (error) {
        console.error('Error loading faculty data:', error);
        setError(error.message || 'Failed to load faculty data');
      } finally {
        setLoading(false);
      }
    };

    loadFacultyData();
  }, []);

  // const handleSwitchView = () => {
  //   navigate('/fa-dashboard');
  // };

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="profile-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/faculty-dashboard" className="back-btn">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Faculty Profile</h2>
      <div className="profile-card">
        <p><strong>Faculty ID:</strong> {faculty?.id || 'N/A'}</p>
        <p><strong>Name:</strong> {faculty?.name || 'N/A'}</p>
        {/* <p><strong>Role:</strong> {localStorage.getItem('isFacultyAdvisor') === 'true' ? 'Faculty Advisor' : 'Faculty'}</p> */}
        <p><strong>Department:</strong> {faculty?.department || 'N/A'}</p>
        <p><strong>Designation:</strong> {faculty?.designation || 'N/A'}</p>
        <p><strong>Faculty Room:</strong> {faculty?.facultyRoom || 'N/A'}</p>
        <p><strong>Email:</strong> {faculty?.email || 'N/A'}</p>
      </div>
      
      {/* {faculty?.isFacultyAdvisor && (
        <button onClick={handleSwitchView} className="switch-view-btn">
          Switch to Faculty Advisor View
        </button>
      )} */}
      
      <Link to="/faculty-dashboard" className="back-btn">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default FacultyProfile;
