import React from "react";
//import { Link } from "react-router-dom";
import "../styles/Faq.css";

const faqs = [
  {
    question: "What is the purpose of this portal?",
    answer:
      "This portal allows faculty to manage, review, and approve student activity points based on their participation in extracurricular activities, workshops, and events.",
  },
  {
    question: "Who can access this portal?",
    answer:
      "Faculty members, Faculty Advisors (FAs), and students can access the portal based on their roles and permissions.",
  },
  {
    question: "How do I review and approve student requests?",
    answer: (
      <ul>
        <li>Log in to the portal.</li>
        <li>Navigate to "My Tasks" under the dashboard.</li>
        <li>Approve or reject the request, adding remarks if needed.</li>
      </ul>
    ),
  },
  {
    question: "How do I add a new event for students to earn activity points?",
    answer: (
      <ul>
        <li>Go to "My Events" in the portal.</li>
        <li>Click on "Add Event".</li>
        <li>Fill in the details (name, date, organizer, eligibility, and points).</li>
        <li>Submit for approval.</li>
      </ul>
    ),
  },
  {
    question: "How can I check feedback on an event I organized?",
    answer: (
      <ul>
        <li>Click on "My Events" in the portal.</li>
        <li>Go to "Completed".</li>
        <li>Click on "View Details" for an event to see feedback.</li>
      </ul>
    ),
  },
  {
    question: "I am unable to log in. What should I do?",
    answer:
      'Ensure you are using the correct institution email and password. If the issue persists, click "Forgot Password".',
  },
];

const FAQ = () => {
  return (
    <div className="faq-container">
      
      {/* Main Content */}
      <div className="main-content">
        {/* <h2 className="page-title">FAQ's</h2> */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
        {/* Doubts Section */}
        <div className="doubts-section">
          <h3>Any Doubts?</h3>
          <div className="form-group">
              <input type="text" placeholder="Add Question *" required />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
