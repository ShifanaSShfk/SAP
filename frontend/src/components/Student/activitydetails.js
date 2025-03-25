import React from 'react';
// import { Bell } from 'lucide-react';
import '../../styles/Student/activitydetails.css';

const ActivityDetailsPage = () => {
  return (
    <div className="activity-details-container">
     
      
      {/* Main Content */}
      <div className="activity-details-content">
       
        
        <div className="page-content">
          <div className="main-content">
            <h1 className="page-title">Details : Hackathon 2025</h1>
            
            <table className="details-table">
              <tbody>
                <tr>
                  <th>Event</th>
                  <td>Technical Hackathon 2025</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>January 25, 2025, 10:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <th>Activity points</th>
                  <td>5 points</td>
                </tr>
                <tr>
                  <th>Faculty Incharge</th>
                  <td>Manjusha K, Anu Mary Chacko</td>
                </tr>
                <tr>
                  <th>Sent Date</th>
                  <td>25/01/2025&nbsp;&nbsp;&nbsp;8:30:00</td>
                </tr>
                <tr>
                  <th>Viewed Date</th>
                  <td>26/01/2025&nbsp;&nbsp;&nbsp;10:30:45</td>
                </tr>
                <tr>
                  <th>Approved Date</th>
                  <td>26/01/2025&nbsp;&nbsp;&nbsp;10:40:45</td>
                </tr>
                <tr>
                  <th>proof</th>
                  <td>student_proof.pdf</td>
                </tr>
              </tbody>
            </table>
          </div>
          
         
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;