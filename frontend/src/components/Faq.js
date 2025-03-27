import React, { useState } from "react";
import "../styles/Faq.css";

const FAQPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [question, setQuestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faqs = [
    {
      question: "What is the purpose of this portal?",
      answer: "This portal allows faculty to manage, review, and approve student activity points based on their participation in extracurricular activities, workshops, and events."
    },
    {
      question: "Who can access this portal?",
      answer: "Faculty members, Faculty Advisors [FA6], and students can access the portal based on their roles and permissions."
    },
    {
      question: "How do I review and approve student requests?",
      answer: "Log in to the portal, navigate to 'All' under the dashboard, and approve or reject requests while adding remarks if needed."
    },
    {
      question: "How do I add a new event for students to earn activity points?",
      answer: "Go to 'My Events', click 'Add Event', fill in details (name, date, organizer, eligibility, points), and submit for approval."
    },
    {
      question: "How can I check feedback on an event I organized?",
      answer: "Click on 'My Events' → 'Completed' → 'View Details' to see student feedback and participant lists."
    },
    {
      question: "I am unable to log in. What should I do?",
      answer: "Ensure you're using the correct institution email and password. If issues persist, click 'Forget Password'."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      setIsSubmitted(true);
      setQuestion("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="faq-container">
      <main className="faq-content">
        <section className="faq-section">
        
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span>{index + 1}. {faq.question}</span>
                  <span className="toggle-icon">
                    {expandedFaq === index ? '−' : '+'}
                  </span>
                </div>
                {expandedFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* <section className="doubts-section">
          <h3>Any Doubts?</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              rows="3"
            />
            {isSubmitted && (
              <p className="success-message">Your question has been submitted!</p>
            )}
            <button type="submit">Submit</button>
          </form>
        </section> */}
      </main>

    </div>
  );
};

export default FAQPage;