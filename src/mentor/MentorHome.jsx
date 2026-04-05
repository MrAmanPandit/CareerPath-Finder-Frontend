import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../admin/DashboardHome.css';
import './MentorDashboard.css'; // Using mentor theme
import SkeletonLoader from '../component/SkeletonLoader';
import { BookOpen, Map, PlusCircle, TrendingUp, Award, Zap } from 'lucide-react';

const MentorHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: { totalCourses: 0, totalRoadmaps: 0 },
    recentCourses: [],
    recentRoadmaps: []
  });

  useEffect(() => {
    const fetchMentorStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/dashboard-stats`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            withCredentials: true
        });
        if (response.data) {
          setData({
            stats: response.data.stats,
            recentCourses: response.data.recentCourses || [],
            recentRoadmaps: response.data.recentRoadmaps || []
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
    <div className="dashboard-home-container">
      <div className="dashboard-intro">
        <h2>Platform Overview (Mentor)</h2>
        <p>Monitor your educational contributions and platform growth.</p>
      </div>

      <div className="stats-grid">
        <Link to="/mentor/manage-courses">
          <div className="stat-card">
            <div className="stat-icon courses-icon">📚</div>
            <div className="stat-details">
              <p className="stat-label">Published Courses</p>
              <h3 className="stat-number">{data.stats.totalCourses}</h3>
            </div>
          </div>
        </Link>

        <Link to="/mentor/manage-roadmaps">
          <div className="stat-card">
            <div className="stat-icon roadmaps-icon">🗺️</div>
            <div className="stat-details">
              <p className="stat-label">Career Roadmaps</p>
              <h3 className="stat-number">{data.stats.totalRoadmaps}</h3>
            </div>
          </div>
        </Link>

        <div className="stat-card">
          <div className="stat-icon active-icon">⚡</div>
          <div className="stat-details">
            <p className="stat-label">Mentor Status</p>
            <h3 className="stat-number">Certified</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="recent-activity-section">
          <div className="section-header">
            <h3>Recently Added Content</h3>
            <button className="view-all-btn" onClick={() => navigate('/mentor/manage-courses')}>View All</button>
          </div>

          <div className="table-container">
            <table className="admin-table">
              <thead className='table-head'>
                <tr>
                  <th>Content Name</th>
                  <th>Type</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {data.recentCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="font-semibold text-dark">{course.name}</td>
                    <td>Course</td>
                    <td>{course.date}</td>
                  </tr>
                ))}
                {data.recentRoadmaps.map((roadmap) => (
                  <tr key={roadmap.id}>
                    <td className="font-semibold text-dark">{roadmap.title}</td>
                    <td>Roadmap</td>
                    <td>{roadmap.date}</td>
                  </tr>
                ))}
                {data.recentCourses.length === 0 && data.recentRoadmaps.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{textAlign:'center', padding:'20px'}}>No recent activity.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="quick-actions-section">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate('/mentor/add-course')}>
              <span className="action-icon">➕</span>
              <span className="action-text">Create New Course</span>
            </button>
            <button className="action-btn" onClick={() => navigate('/mentor/add-roadmap')}>
              <span className="action-icon">🛤️</span>
              <span className="action-text">Build Roadmap</span>
            </button>
            <button className="action-btn outline-btn" onClick={() => navigate('/')}>
              <span className="action-icon">👁️</span>
              <span className="action-text">View Live Site</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorHome;
