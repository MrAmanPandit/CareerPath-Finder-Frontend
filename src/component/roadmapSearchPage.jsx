import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './roadmapSearchPage.css';
import AnimatedPage from './animation';
import axios from 'axios';
import SkeletonLoader from './SkeletonLoader';
import useSEO from '../utils/useSEO';
import SEOSchema from './SEOSchema';
import { 
  Laptop, BarChart, ShieldCheck, Cloud, TrendingUp, Search, 
  Map as MapIcon, Play, ArrowRight, Star, DollarSign, 
  Award, Building, Briefcase, Zap, X, Info
} from 'lucide-react';
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';
import { motion, AnimatePresence } from 'framer-motion';

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
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
          headers: { Authorization: `Bearer ${token}` },
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
      showSuccessAlert(response.data.data.includes(id) ? "Roadmap saved to dashboard!" : "Roadmap removed from dashboard");
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

  const triggerSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);
    setShowSuggestions(false);
    setRoadmap(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/roadmaps/search?q=${encodeURIComponent(trimmedQuery)}`);

      if (response.data.data && response.data.data.length > 0) {
        setRoadmap(response.data.data[0]);
      } else {
        setRoadmap(null);
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setRoadmap(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    triggerSearch(searchQuery);
  };

  const handleQuickSearch = (job) => {
    setSearchQuery(job); 
    triggerSearch(job);  
  };

  const clearSearch = () => {
    setSearchQuery('');
    setRoadmap(null);
    setShowSuggestions(false);
  };

  // Helper to split comma-separated strings
  const getList = (str) => str ? str.split(',').map(s => s.trim()) : [];

  return (
    <AnimatedPage>
      <SEOSchema schema={searchSchema} />
      <div className="roadmap-page improved-ux">
        
        {/* Animated Background Elements */}
        <div className="bg-blur blur-1"></div>
        <div className="bg-blur blur-2"></div>

        <section className="roadmap-hero">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              Architect Your <span className="text-gradient">Future</span>
            </h1>
            <p className="hero-subtitle">
              Precision-engineered roadmaps for the world's most competitive careers.
            </p>
          </motion.div>

          <form className="search-form-premium" onSubmit={handleFormSubmit} ref={searchRef}>
            <div className="search-input-wrapper">
              <Search className="search-icon-inside" size={20} />
              <input
                type="text"
                className="get-input-premium"
                placeholder="Find any professional career..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length >= 2) setShowSuggestions(true);
                }}
              />
              {searchQuery && (
                <button type="button" className="clear-btn" onClick={clearSearch}>
                  <X size={16} />
                </button>
              )}
            </div>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.ul 
                  className="suggestions-dropdown-premium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {suggestions.map((sug, idx) => (
                    <li
                      key={idx}
                      className="suggestion-item-premium"
                      onClick={() => {
                        setSearchQuery(sug);
                        triggerSearch(sug);
                      }}
                    >
                      <Zap size={14} className="suggestion-icon" /> {sug}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <button type="submit" className="search-btn-premium">
              {isSearching ? <div className="loader-dots"><span></span><span></span><span></span></div> : 'Analyze Path'}
            </button>
          </form>

          {!roadmap && !isSearching && (
             <motion.div 
               className="trending-topics"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
             >
               <span>Trending:</span>
               {["Software Engineer", "UI/UX Designer", "Product Manager", "Data Scientist"].map(job => (
                 <button key={job} onClick={() => handleQuickSearch(job)} className="trend-pill">{job}</button>
               ))}
             </motion.div>
          )}
        </section>

        {isSearching && (
          <div className="search-loading-container">
            <SkeletonLoader type="search" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!roadmap && !isSearching && (
            <motion.section 
              key="empty-state"
              className="empty-state-v2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="features-grid-premium">
                {[
                  { icon: <MapIcon />, title: "Precision Mapping", desc: "Granular steps from entry level to senior executive." },
                  { icon: <TrendingUp />, title: "Market Realities", desc: "Live-updated salary ranges and industrial demand." },
                  { icon: <ShieldCheck />, title: "Verified Courses", desc: "Curated learning paths from top universities & platforms." }
                ].map((feat, i) => (
                  <div key={i} className="feature-card-v2">
                    <div className="feat-icon">{feat.icon}</div>
                    <h3>{feat.title}</h3>
                    <p>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {roadmap && !isSearching && (
            <motion.section 
              key="results"
              className="roadmap-results-v2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="results-layout">
                {/* Main Content: The Path */}
                <div className="path-main">
                  <div className="results-header-premium">
                    <div className="header-text">
                      <span className="badge-career">Professional Path</span>
                      <h1>{roadmap.jobTitle}</h1>
                    </div>
                    <div className="header-actions">
                      <button
                        className={`action-btn-save ${userSavedRoadmaps.includes(roadmap._id) ? 'saved' : ''}`}
                        onClick={() => handleToggleSave(roadmap._id)}
                      >
                        <Star size={18} fill={userSavedRoadmaps.includes(roadmap._id) ? "currentColor" : "none"} />
                        {userSavedRoadmaps.includes(roadmap._id) ? 'Saved to Dashboard' : 'Save Roadmap'}
                      </button>
                    </div>
                  </div>

                  <div className="path-timeline-premium">
                    {roadmap.steps.map((step, index) => (
                      <motion.div 
                        className="path-step" 
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="step-marker">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-line"></div>
                        </div>
                        <div className="step-body card-glass">
                          <div className="step-meta">
                            <h3>{step.title}</h3>
                            <span className="step-tag">{step.duration}</span>
                          </div>
                          <p className="step-info">{step.description}</p>
                          
                          {step.courses && step.courses.length > 0 && (
                            <div className="step-resources">
                              <span className="res-label">Target Learning:</span>
                              <div className="res-grid">
                                {step.courses.map((course, i) => (
                                  <a 
                                    key={i} 
                                    href={typeof course === 'object' ? course.link : "#"} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="res-item"
                                  >
                                    <Play size={12} fill="currentColor" />
                                    {typeof course === 'object' ? course.name : course}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sidebar: Market Insights */}
                <aside className="path-sidebar">
                  <div className="sidebar-card-premium card-glass">
                    <div className="sidebar-title">
                      <DollarSign size={20} className="icon-gold" />
                      <h4>Earnings Potential</h4>
                    </div>
                    <div className="salary-highlight">
                      {roadmap.expectedSalary || "₹8L - ₹15L"}
                      <span>Avg. Starting / Year</span>
                    </div>
                    <p className="sidebar-description">Based on current market trends for professionals with verified certifications.</p>
                  </div>

                  <div className="sidebar-card-premium card-glass">
                    <div className="sidebar-title">
                      <TrendingUp size={20} className="icon-blue" />
                      <h4>Future Trajectory</h4>
                    </div>
                    <p className="sidebar-description">{roadmap.futureScope || "This role is seeing exponential growth due to digital transformation across all sectors."}</p>
                  </div>

                  <div className="sidebar-card-premium card-glass">
                    <div className="sidebar-title">
                      <Award size={20} className="icon-purple" />
                      <h4>Core Competencies</h4>
                    </div>
                    <div className="skills-tags-premium">
                      {getList(roadmap.requiredSkills).length > 0 ? getList(roadmap.requiredSkills).map((s, i) => (
                        <span key={i} className="skill-pill-premium">{s}</span>
                      )) : (
                        ["Logical Reasoning", "Technical Basics", "Communication"].map(s => <span key={s} className="skill-pill-premium">{s}</span>)
                      )}
                    </div>
                  </div>

                  <div className="sidebar-card-premium card-glass">
                    <div className="sidebar-title">
                      <Building size={20} className="icon-green" />
                      <h4>Top Destinations</h4>
                    </div>
                    <div className="companies-stack">
                      {getList(roadmap.companiesHiring).length > 0 ? getList(roadmap.companiesHiring).map((c, i) => (
                        <div key={i} className="company-logo-text">
                          <CheckCircle size={14} className="icon-check" /> {c}
                        </div>
                      )) : (
                        ["Top Tier MNCs", "Growth Startups"].map(c => <div key={c} className="company-logo-text"><CheckCircle size={14} className="icon-check" /> {c}</div>)
                      )}
                    </div>
                  </div>

                  <button 
                    className="full-insights-cta"
                    onClick={() => navigate(`/career/roadmap/${encodeURIComponent(roadmap.jobTitle)}/insights`)}
                  >
                    Deep Dive Analytics <ArrowRight size={18} />
                  </button>
                </aside>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </div>
    </AnimatedPage>
  );
};

const CheckCircle = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default RoadmapSearchPage;