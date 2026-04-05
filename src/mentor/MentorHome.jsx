import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../admin/DashboardHome.css';
import './MentorDashboard.css'; // Using mentor theme
import SkeletonLoader from '../component/SkeletonLoader';
import { BookOpen, Map, PlusCircle, TrendingUp, Award, Zap } from 'lucide-react';

const MentorHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalRoadmaps: 0
  });

  useEffect(() => {
    const fetchMentorStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/dashboard-stats`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            withCredentials: true
        });
        if (response.data) {
          setStats({
            totalCourses: response.data.stats.totalCourses,
            totalRoadmaps: response.data.stats.totalRoadmaps
          });
        }
      } catch (error) {
        console.error("Failed to fetch mentor stats");
      } finally {
        setLoading(false);
      }
    };
    fetchMentorStats();
  }, []);

  if (loading) return <div className="dashboard-loading"><SkeletonLoader type="dashboard" /></div>;

  return (
    <div className="mentor-home-container">
      <div className="dashboard-intro">
        <h2>Curator Insights</h2>
        <p>Maintain the platform's educational Excellence.</p>
      </div>

      <div className="stats-grid">
        <Link to="/mentor/manage-courses">
          <div className="stat-card mentor-stat-card">
            <div className="stat-icon courses-icon"><BookOpen size={32} /></div>
            <div className="stat-details">
              <p className="stat-label">Total Courses</p>
              <h3 className="stat-number">{stats.totalCourses}</h3>
            </div>
          </div>
        </Link>

        <Link to="/mentor/manage-roadmaps">
          <div className="stat-card mentor-stat-card">
            <div className="stat-icon roadmaps-icon"><Map size={32} /></div>
            <div className="stat-details">
              <p className="stat-label">Total Roadmaps</p>
              <h3 className="stat-number">{stats.totalRoadmaps}</h3>
            </div>
          </div>
        </Link>

        <div className="stat-card mentor-stat-card contribution-highlight">
            <div className="stat-icon"><Award size={32} /></div>
            <div className="stat-details">
              <p className="stat-label">Mentor Status</p>
              <h3 className="stat-number">Certified</h3>
            </div>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="quick-actions-section mentor-quick-actions">
          <div className="section-header">
            <h3>Curation Shortcuts</h3>
          </div>
          <div className="actions-grid">
            <button className="action-btn mentor-btn" onClick={() => navigate('/mentor/add-course')}>
              <PlusCircle size={20} />
              <span className="action-text">New Course</span>
            </button>
            <button className="action-btn mentor-btn" onClick={() => navigate('/mentor/add-roadmap')}>
              <Zap size={20} />
              <span className="action-text">New Roadmap</span>
            </button>
          </div>
        </div>

        <div className="contribution-widget mentor-widget">
          <div className="widget-header">
            <TrendingUp size={20} />
            <h3>Platform Guidelines</h3>
          </div>
          <ul className="guideline-list">
            <li>Ensure all course fees are updated monthly.</li>
            <li>Verify roadmap steps for industry relevance.</li>
            <li>Mention certified government bodies in course descriptions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentorHome;
