import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './roadmapSearchPage.css';
import AnimatedPage from './animation';
import axios from 'axios';
import SkeletonLoader from './SkeletonLoader';
import useSEO from '../utils/useSEO';
import SEOSchema from './SEOSchema';
import { Laptop, BarChart, ShieldCheck, Cloud, TrendingUp, Search, Map as MapIcon, Play, ArrowRight, Star } from 'lucide-react';
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';

const RoadmapSearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [userSavedRoadmaps, setUserSavedRoadmaps] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Fetch user's saved roadmaps on mount
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
          withCredentials: true
        });
        setUserSavedRoadmaps(response.data.data.savedRoadmaps || []);
      } catch (err) {
        console.error("Error fetching saved roadmaps:", err);
      }
    };
    fetchSaved();
  }, []);

  // Fetch suggestions as the user types (with debounce)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/roadmaps/suggestions?q=${encodeURIComponent(searchQuery.trim())}`);
        setSuggestions(response.data.data || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleSave = async (id) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/toggle-roadmap/`,
        { roadmapId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }, withCredentials: true }
      );
      setUserSavedRoadmaps(response.data.data);
      showSuccessAlert(response.data.data.includes(id) ? "Roadmap removed from dashboard" : "Roadmap saved to dashboard!");
    } catch (err) {
      showErrorAlert("Login required to save roadmaps");
    }
  };

  useSEO({
    title: 'AI Career Roadmap Generator | Search Any Career',
    description: 'Use our AI-powered roadmap generator to discover the exact degrees, courses, and steps required to achieve your dream career in technology, medicine, design, and more.',
    canonical: '/career/roadmap/search',
    keywords: 'AI career roadmap, roadmap generator, career path search, create career plan'
  });

  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": "Career Roadmap Generator",
    "description": "Generate step-by-step career and educational roadmaps tailored to specific professions."
  };

  // Separated the search logic so it can be triggered by the form OR the suggestions OR the quick-buttons
  const triggerSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);
    setShowSuggestions(false);
    setRoadmap(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/roadmaps/search?q=${encodeURIComponent(trimmedQuery)}`);

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
      <SEOSchema schema={searchSchema} />
      <div className="roadmap-page">

        {/* 1. The Search Hero */}
        <section className="roadmap-hero">
          <h1 className="text-gradient">Discover Your Path</h1>
          <p>Enter your dream job below, and we will generate a step-by-step educational roadmap to help you achieve it.</p>

          <form className="search-form" onSubmit={handleFormSubmit} ref={searchRef}>
            <input
              type="text"
              className="search-input"
              placeholder="e.g., Software Engineer, Data Scientist, UI/UX Designer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {suggestions.map((sug, idx) => (
                  <li
                    key={idx}
                    className="suggestion-item"
                    onClick={() => {
                      setSearchQuery(sug);
                      triggerSearch(sug);
                    }}
                  >
                    <Search size={14} style={{ marginRight: '10px', opacity: 0.6 }} /> {sug}
                  </li>
                ))}
              </ul>
            )}
            <button type="submit" className="search-btn">
              {isSearching ? 'Mapping...' : (
                <>Generate Roadmap <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </section>

        {/* 2. Loading State */}
        {isSearching && (
          <div className="loading-state" style={{ marginTop: '30px' }}>
            <SkeletonLoader type="search" />
          </div>
        )}

        {/* 3. Empty State */}
        {!roadmap && !isSearching && (
          <section className="suggestions-section">
            <h2 className="suggestions-header">Not sure where to start?</h2>
            <p className="suggestions-subtext">Explore some of the most popular career paths chosen by our students.</p>

            <div className="popular-jobs-grid">
              <button className="job-pill-btn" onClick={() => handleQuickSearch("Software Engineer")}><Laptop size={18} /> Software Engineer</button>
              <button className="job-pill-btn" onClick={() => handleQuickSearch("Data Scientist")}><BarChart size={18} /> Data Scientist</button>
              <button className="job-pill-btn" onClick={() => handleQuickSearch("Cyber Security")}><ShieldCheck size={18} /> Cyber Security</button>
              <button className="job-pill-btn" onClick={() => handleQuickSearch("Cloud Architect")}><Cloud size={18} /> Cloud Architect</button>
              <button className="job-pill-btn" onClick={() => handleQuickSearch("Product Manager")}><TrendingUp size={18} /> Product Manager</button>
            </div>

            <div className="how-it-works-grid">
              <div className="step-card glass-card">
                <div className="step-icon"><Search size={28} /></div>
                <h3>Search a Career</h3>
                <p>Type in any professional career or tech role you are dreaming of pursuing.</p>
              </div>
              <div className="step-card glass-card">
                <div className="step-icon"><MapIcon size={28} /></div>
                <h3>Get the Roadmap</h3>
                <p>We break down exactly which degrees, diplomas, and skills you need.</p>
              </div>
              <div className="step-card glass-card">
                <div className="step-icon"><Play size={28} /></div>
                <h3>Start Learning</h3>
                <p>Click on the recommended courses to instantly start building your foundation.</p>
              </div>
            </div>
          </section>
        )}

        {/* 4. The Timeline Results (Shows when roadmap exists) */}
        {roadmap && !isSearching && (
          <section className="roadmap-results">
            <div className="results-header">
              <h2>Your Roadmap to becoming a <span>{roadmap.jobTitle}</span></h2>
              <button
                className={`save-roadmap-btn ${userSavedRoadmaps.includes(roadmap._id) ? 'saved' : ''}`}
                onClick={() => handleToggleSave(roadmap._id)}
              >
                {userSavedRoadmaps.includes(roadmap._id) ? <><Star size={18} fill="currentColor" /> Saved</> : <><Star size={18} /> Save Roadmap</>}
              </button>
              <button
                className="insights-btn"
                onClick={() => navigate(`/career/roadmap/${encodeURIComponent(roadmap.jobTitle)}/insights`)}
              >
                <TrendingUp size={18} /> View Insights
              </button>
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
                          {step.courses.map((course, i) => {
                            const isObject = typeof course === 'object' && course !== null;
                            const name = isObject ? course.name : course;
                            const link = isObject ? course.link : "#";

                            return (
                              <li key={i}>
                                <a
                                  href={link}
                                  target={link && link !== "#" ? "_blank" : "_self"}
                                  rel="noopener noreferrer"
                                  className="course-item"
                                  onClick={(e) => (link === "#" || !link) && e.preventDefault()}
                                >
                                  → {name}
                                </a>
                              </li>
                            );
                          })}
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