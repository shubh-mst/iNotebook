import React, { useEffect } from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>📒 About iNotebook</h1>
        <p>
          Your personal digital workspace to capture ideas, organize notes, and
          stay productive every day.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>🚀 Our Mission</h2>
        <p>
          iNotebook was created with one simple goal: helping people organize
          their thoughts effortlessly. Whether you're a student, developer,
          writer, or professional, your ideas deserve a safe and beautiful
          place.
        </p>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>✨ Features You'll Love</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>📝 Create Notes</h3>
            <p>Quickly capture ideas, tasks, and important information.</p>
          </div>

          <div className="feature-card">
            <h3>📌 Pin Important Notes</h3>
            <p>Keep your most valuable notes at the top for easy access.</p>
          </div>

          <div className="feature-card">
            <h3>📦 Archive Notes</h3>
            <p>Organize your workspace without deleting important content.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Access</h3>
            <p>
              Your notes are protected with authentication and secure access.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast Performance</h3>
            <p>Built with React and Node.js for a smooth experience.</p>
          </div>

          <div className="feature-card">
            <h3>🎯 Productivity Focused</h3>
            <p>Designed to help you stay focused and organized.</p>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="about-section">
        <h2>💡 Why Choose iNotebook?</h2>
        <p>
          Unlike traditional notebooks, iNotebook allows you to access your
          notes anytime, organize them intelligently, and focus on what truly
          matters—your ideas.
        </p>
      </section>

      {/* Quote */}
      <section className="quote-section">
        <h2>"Great ideas deserve a great place to live."</h2>
        <p>— Team iNotebook</p>
      </section>
    </div>
  );
};

export default About;
