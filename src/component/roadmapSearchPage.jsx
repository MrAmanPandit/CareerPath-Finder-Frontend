import { useState } from 'react';
import './roadmapSearchPage.css';
import AnimatedPage from './animation';
import axios from 'axios';

const RoadmapSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  // Separated the search logic so it can be triggered by the form OR the quick-buttons
  const triggerSearch = async (query) => {
    setIsSearching(true);
    setRoadmap(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/roadmaps/search?q=${encodeURIComponent(query)}`);
      
      // Our backend returns { message: "...", data: [ { jobTitle: "...", steps: [...] } ] }
      // We'll take the first match for simplicity
      if (response.data.data && response.data.data.length > 0) {
        setRoadmap(response.data.data[0]);
      } else {
        setRoadmap(null); // Explicitly handle no matches (though backend returns a 404 in this case)
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      // Optional: Add a state for displaying an error message to the user here
      setRoadmap(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Triggered when they press "Enter" or click the Search button
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    triggerSearch(searchQuery);
  };

  // Triggered when they click a suggestion pill
  const handleQuickSearch = (job) => {
    setSearchQuery(job); // Fills the input box
    triggerSearch(job);  // Instantly searches
  };

  return (
    <AnimatedPage>
    <div className="roadmap-page">
      
      {/* 1. The Search Hero */}
      <section className="roadmap-hero">
        <h1>Discover Your Path</h1>
        <p>Enter your dream job below, and we will generate a step-by-step educational roadmap to help you achieve it.</p>
        
        <form className="search-form" onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            className="search-input"
            placeholder="e.g., Software Engineer, Data Scientist, UI/UX Designer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            {isSearching ? 'Mapping...' : 'Generate Roadmap'}
          </button>
        </form>
      </section>

      {/* 2. Loading State */}
      
      {isSearching && (
        <div className="loading-state">
          <p>Analyzing career trajectories for "{searchQuery}"...</p>
        </div>
      )}
      
      {/* 3. THE NEW EMPTY STATE (Shows when NOT searching and NO roadmap exists) */}
      {!roadmap && !isSearching && (
        <section className="suggestions-section">
          
          <h2 className="suggestions-header">Not sure where to start?</h2>
          <p className="suggestions-subtext">Explore some of the most popular career paths chosen by our students.</p>
          
          {/* Quick Search Buttons */}
          <div className="popular-jobs-grid">
            <button className="job-pill-btn" onClick={() => handleQuickSearch("Software Engineer")}>💻 Software Engineer</button>
            <button className="job-pill-btn" onClick={() => handleQuickSearch("Data Scientist")}>📊 Data Scientist</button>
            <button className="job-pill-btn" onClick={() => handleQuickSearch("Cyber Security")}>🔐 Cyber Security</button>
            <button className="job-pill-btn" onClick={() => handleQuickSearch("Cloud Architect")}>☁️ Cloud Architect</button>
            <button className="job-pill-btn" onClick={() => handleQuickSearch("Product Manager")}>📈 Product Manager</button>
          </div>

          {/* How It Works Explainer */}
          <div className="how-it-works-grid">
            <div className="step-card">
              <div className="step-icon">1</div>
              <h3>Search a Career</h3>
              <p>Type in any professional career or tech role you are dreaming of pursuing in the future.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">2</div>
              <h3>Get the Roadmap</h3>
              <p>We break down exactly which degrees, diplomas, and skills you need from high school to graduation.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">3</div>
              <h3>Start Learning</h3>
              <p>Click on the recommended courses and bootcamps to instantly start building your career foundation.</p>
            </div>
          </div>

        </section>
      )}

      {/* 4. The Timeline Results (Shows when roadmap exists) */}
      {roadmap && !isSearching && (
        <section className="roadmap-results">
          <div className="results-header">
            <h2>Your Roadmap to becoming a <span>{roadmap.jobTitle}</span></h2>
          </div>

          <div className="timeline">
            {roadmap.steps.map((step, index) => (
              <div className="timeline-item" key={step.id}>
                <div className="timeline-dot">{index + 1}</div>
                <div className="timeline-content">
                  <h3 className="step-title">{step.title}</h3>
                  <span className="step-duration">{step.duration}</span>
                  <p className="step-description">{step.description}</p>
                  
                  {step.courses && step.courses.length > 0 && (
                    <div className="course-recommendations">
                      <h4>Recommended Courses & Programs</h4>
                      <ul className="course-list">
                        {step.courses.map((course, i) => (
                          <li key={i}>
                            <a href="#course-link" className="course-item">→ {course}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
    </div>
    </AnimatedPage>
  );
};

export default RoadmapSearchPage;