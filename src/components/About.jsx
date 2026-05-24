import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero glass">
        <h2>Revolutionizing Campus Dining</h2>
        <p>Project Iceberg Canteen is a premium web-based food ordering application designed to modernize college canteens by replacing inefficient manual processes with a sleek digital workflow.</p>
      </div>

      <div className="about-content">
        <div className="about-section glass">
          <h3>The Problem & Solution</h3>
          <p>College canteens often suffer from long queues, manual order errors, and slow cash handling. Our solution is a modern platform enabling online menu viewing, remote ordering, and seamless digital payments.</p>
          <div className="highlight-box">
            <h4>Key Innovation: Virtual Waiting</h4>
            <p>We shift the wait from physical lines to a digital space. Students can study or relax while their food is prepared, and are notified only when it is ready for pickup.</p>
          </div>
        </div>

        <div className="about-section glass">
          <h3>Meet the Developer</h3>
          <p className="dept-text">
            Department of Computer Science & Engineering (AI&ML)<br />
            RCC Institute of Information Technology
          </p>
          
          <div className="team-card">
            <div className="avatar">AM</div>
            <div className="team-info">
              <h4>Abhinaba Mandal</h4>
              <span className="id-badge">CSEAI2025039</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
