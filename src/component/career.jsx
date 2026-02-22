import React from 'react';
import './career.css';
import { Link } from 'react-router-dom';

const Careers = () => {
  // Sample data for the careers grid
  return (
    <div className="careersWrapper">
      
      {/* Page Header */}
      <div className="careersHeader">
        <h1 className="careersTitle">Explore Careers</h1>
        <p className="careersSubtitle">Discover top professions, understand what they do, and find out which stream will get you there.</p>
      </div>

      {/* Search/Filter Bar */}
      <div className="searchContainer">
        <input 
          type="text" 
          className="careerSearchInput" 
          placeholder="Search for a career (e.g., Doctor, Designer)..." 
        />
        <button className="searchBtn">Search</button>
      </div>

      {/* Careers Grid */}
      <div className="careersGrid">
       
          <div className="careerCard" >
            <div className="careerCardHeader">
              <span className="careerIcon">💻</span>
              <span className="careerGrowth">Very High Paying</span>
            </div>
            
            <h3 className="careerName">Software Engineer</h3>
            <span className="careerStream">Path: Math (PCM)</span>
            
            <p className="careerDesc">Design, build, and maintain software applications and systems.</p>
            
            <Link to="/career/roadmap/software-engineer" className="readMoreBtn">View Roadmap ➔</Link>
          </div>
          
          <div className="careerCard" >
            <div className="careerCardHeader">
              <span className="careerIcon">📈</span>
              <span className="careerGrowth">High Demand</span>
            </div>
            
            <h3 className="careerName">Investment Banker</h3>
            <span className="careerStream">Path: Commerce</span>
            
            <p className="careerDesc">Help corporate clients raise capital and provide financial advisory.</p>
            
            <Link to="/career/roadmap/investment-banker" className="readMoreBtn">View Roadmap ➔</Link>
          </div>

          <div className="careerCard" > 
            <div className="careerCardHeader">
              <span className="careerIcon">🧠</span>
              <span className="careerGrowth">Fast Growing</span>
            </div>

            <h3 className="careerName">Clinical Psychologist</h3>
            <span className="careerStream">Path: Arts / Biology</span>

            <p className="careerDesc">Assess, diagnose, and treat mental, emotional, and behavioral disorders.</p>

            <Link to="/career/roadmap/clinical-psychologist" className="readMoreBtn">View Roadmap ➔</Link>
          </div>

            <div className="careerCard" >   
               <div className="careerCardHeader">
                    <span className="careerIcon">✈️</span>
                    <span className="careerGrowth">Global Demand</span>
                </div>
                <h3 className="careerName">Commercial Pilot</h3>
                <span className="careerStream">Path: Math (PCM)</span>
                <p className="careerDesc">Navigate and fly airplanes for airlines, transporting passengers and cargo.</p>
                <Link to="/career/roadmap/commercial-pilot" className="readMoreBtn">View Roadmap ➔</Link>
            </div>

            <div className="careerCard" >
                <div className="careerCardHeader">
                    <span className="careerIcon">🎨</span>
                    <span className="careerGrowth">Creative Tech</span>
                </div>
                <h3 className="careerName">UI/UX Designer</h3>
                <span className="careerStream">Path: Any Stream</span>
                <p className="careerDesc">Create user-friendly interfaces and design digital experiences for apps and websites.</p>
                <Link to="/career/roadmap/ui-ux-designer" className="readMoreBtn">View Roadmap ➔</Link>
            </div> 

            <div className="careerCard" >
                <div className="careerCardHeader">
                    <span className="careerIcon">📊</span>
                    <span className="careerGrowth">Top Rated</span>
                </div>
                <h3 className="careerName">Data Scientist</h3>
                <span className="careerStream">Path: Math / Commerce</span>
                <p className="careerDesc">Analyze complex raw data to find trends and help businesses make decisions.</p>
                <Link to="/career/roadmap/data-scientist" className="readMoreBtn">View Roadmap ➔</Link>
            </div>


      </div>

    </div>
  );
};

export default Careers;