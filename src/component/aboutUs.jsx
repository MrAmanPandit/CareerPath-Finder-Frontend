import React from 'react';
import './aboutUs.css';
import amanImg from '../assets/aman.png';
import mohitImg from '../assets/mohit.png';
import yuvImg from '../assets/yuv.png';
import harshikaImg from '../assets/harshika.png';


const About = () => {
  return (
    <div className="aboutWrapper">
      <div className="aboutCard">
        <h1 className="aboutTitle">About Us</h1>
        
        <p className="aboutText">
          CareerPath Finder is your personalized guide to discovering the right career. 
          Whether you're a student exploring options, a graduate unsure of your next step, 
          or a professional considering a career switch, CareerPath Finder helps you identify 
          opportunities that align with your skills, interests, and goals.
        </p>

        <div className="aboutFeatures">
          <div className="featureItem">
            <span className="featureIcon">🎯</span>
            <h3 className="featureTitle">Discover Your Passion</h3>
            <p className="featureDesc">Find career paths perfectly suited to your unique strengths.</p>
          </div>
          <div className="featureItem">
            <span className="featureIcon">📈</span>
            <h3 className="featureTitle">Plan Your Future</h3>
            <p className="featureDesc">Get step-by-step guidance to reach your ultimate dream career.</p>
          </div>
        </div>
        <div className="developers">
        <h1>Our Team</h1>
        <div className="members_row">
          <div className="memberscard">
            <img src={amanImg} alt="Aman Pandey" />
            <div className='text'>
              <h3 className='memberName'>Aman Pandey</h3>
              <h5 className="designation">Frontend Developer</h5>
            </div>
          </div>
          <div className="memberscard">
            <img src={mohitImg} alt="Mohit Pal" />
            <div className='text'>
              <h3 className='memberName'>Mohit Pal</h3>
              <h5 className="designation">Backend Developer</h5>
            </div>
          </div>
          <div className="memberscard">
            <img src={yuvImg} alt="Yuvraj Upadhyay" />
            <div className='text'>
              <h3 className='memberName'>Yuvraj Upadhyay</h3>
              <h5 className="designation">Investor</h5>
            </div>
          </div>
          <div className="memberscard">
            <img src={harshikaImg} alt="Harshika Singh" />
            <div className='text'>
              <h3 className='memberName'>Harshika Singh</h3>
              <h5 className="designation">Supportive Guy</h5>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default About;