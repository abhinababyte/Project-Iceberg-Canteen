import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>Have a suggestion for a new feature? Are you a canteen owner interested in our platform? We'd love to hear from you.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info glass">
          <h3>Contact Information</h3>
          <p className="info-desc">Project Iceberg Canteen is developed with love for the campus.</p>
          
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h4>Location</h4>
              <p>RCC Institute of Information Technology</p>
              <p>Dept. of Computer Science & Engineering (AI&ML)</p>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <h4>Email Us</h4>
              <p>support@projecticeberg.in</p>
              <p>collaboration@rcciit.org</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">🕒</span>
            <div>
              <h4>Lab Hours</h4>
              <p>Mon - Fri: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form glass">
          <h3>Send a Message</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>I am a...</label>
              <select>
                <option value="student">Student</option>
                <option value="faculty">Faculty Member</option>
                <option value="owner">Canteen Owner</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
