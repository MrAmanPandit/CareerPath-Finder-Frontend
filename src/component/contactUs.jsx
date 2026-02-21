import React from 'react';
import './contactUs.css'; 

const Contact = () => {
  return (
    <div className="contactWrapper">
      <div className="contactCard">
        <h2 className="contactTitle">Get in Touch</h2>
        <p className="contactText">
          Have questions or suggestions? We'd love to hear from you! Whether you're looking for support, want to share feedback, or just want to say hello, feel free to reach out. 
          Send us a message and our team will get back to you shortly.
        </p>
        
        <form className="contactForm">
          <div className="inputGroup">
            <label className="inputLabel">Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              className="inputField" 
              required 
            />
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="inputField" 
              required 
            />
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Phone Number</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              className="inputField" 
              required 
            />
          </div>
          
          <div className="inputGroup">
            <label className="inputLabel">Message</label>
            <textarea 
              placeholder="How can we help you?" 
              className="inputField textArea" 
              rows="5"
              required 
            ></textarea>
          </div>
          
          <button type="submit" className="submitButton">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;