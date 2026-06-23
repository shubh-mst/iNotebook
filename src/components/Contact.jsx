import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    alert("Message sent successfully!");
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-left">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Have a question, suggestion, or issue?
            Send us a message and we'll get back to you soon.
          </p>

          <div className="contact-info">
            <div>
              <i className="fa-solid fa-envelope"></i>
              <span>support@iNotebook.com</span>
            </div>

            <div>
              <i className="fa-solid fa-phone"></i>
              <span>+91 98978 74181</span>
            </div>

            <div>
              <i className="fa-solid fa-location-dot"></i>
              <span>Moradabad, India</span>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                rows="5"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
