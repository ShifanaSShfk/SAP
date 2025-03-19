import React from "react";
import "../../styles/Faculty/eventdetails.css";

const EventDetails = () => {
  return (
    <div className="event-container">
     

      {/* Main Content */}
      <div className="main-content">
        <h2 className="event-title">Hackathon, 2025</h2>

        {/* Event Information */}
        <div className="event-info">
          <h3>Event Information</h3>
    

          <ul>
            <li><p><strong>"Technical Hackathon 2025"</strong></p></li>
            <li><p><strong>Date & Time:</strong> January 25, 2025, 10:00 AM - 5:00 PM</p></li>
            <li><p><strong>Conducted by:</strong> Manjusha K, Anu Mary Chacko</p></li>
            <li><p><strong>Category:</strong> Department level</p></li>
            <li><p><strong>Venue:</strong> Auditorium</p></li>
          </ul>
       
        </div>

        {/* Student Participation */}
        <div className="event-participation">
          <h3>Student Participation</h3>
          <p><strong>Total Participants:</strong> 45</p>
        </div>

        {/* Rewards */}
        <div className="event-rewards">
          <h3>Rewards</h3>
          <ul>
            <li><strong>Winner:</strong> ₹25,000</li>
            <li><strong>Runner-up:</strong> ₹15,000</li>
            <li><strong>Best Innovation Award:</strong> ₹10,000</li>
            <li>Each participant earned 5 Activity Points</li>
          </ul>
          <a href="#" className="participants-link">List of Participants</a>
        </div>

        {/* Student Feedback & Reviews */}
        <div className="event-feedback">
          <h3>Student Feedback & Reviews</h3>
          <p><strong>Overall Event Rating</strong></p>
          <p>⭐ ⭐ ⭐ ⭐ ☆</p>
          <ul>
            <li>
              "The hackathon was exciting, and we learned a lot! However, a pre-event workshop on problem-solving
              and tech stacks would have helped first-time participants feel more confident."
            </li>
            <li>
              "The WiFi was unstable at times, making it hard to research and test our projects. Also, more power sockets would have helped, as some teams struggled to charge their laptops."
            </li>
            <li>
              "We weren't sure what aspects the judges were focusing on. Clear guidelines on evaluation criteria
              beforehand would have helped us plan our projects better."
            </li>
          </ul>
        </div>

        {/* Attachments */}
        <div className="event-attachments">
          <h3>Documents & Proofs (Attachments Section)</h3>
        </div>

        {/* Comments Section */}
        <div className="event-comments">
          <h3>Comments</h3>
          <input type="text" className="comment-input" placeholder="Add comment" />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
