import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardHome.css';
import SkeletonLoader from '../component/SkeletonLoader';

const authHeaders = () => ({
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
});

const DashboardHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRoadmaps: 0,
    activeSessions: 0
  });

  const [feedbackCounts, setFeedbackCounts] = useState({
    totalSuggestions: 0,
    unreadSuggestions: 0,
    totalComplaints: 0,
    unreadComplaints: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Use allSettled so one failing request doesn't block the other
        const [dashResult, feedbackResult] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/dashboard-stats`, authHeaders()),
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/contact/counts`, authHeaders())
        ]);

        if (dashResult.status === 'fulfilled' && dashResult.value.data) {
          setStats(dashResult.value.data.stats);
          setRecentUsers(dashResult.value.data.recentUsers);
        } else if (dashResult.status === 'rejected') {
          console.error("Failed to fetch dashboard stats:", dashResult.reason);
        }

        if (feedbackResult.status === 'fulfilled' && feedbackResult.value.data?.data) {
          setFeedbackCounts(feedbackResult.value.data.data);
        } else if (feedbackResult.status === 'rejected') {
          console.warn("Feedback counts not available (backend may need restart):", feedbackResult.reason?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading"><SkeletonLoader type="dashboard" /></div>;
  }

  return (
    <div className="dashboard-home-container">

      <div className="dashboard-intro">
        <h2>Platform Overview</h2>
        <p>Here is what is happening inside CareerPath Finder today.</p>
      </div>

      {/* 1. Stat Cards Grid */}
      <div className="stats-grid">
        <Link to="/admin/manage-users">
          <div className="stat-card">
            <div className="stat-icon users-icon">👥</div>
            <div className="stat-details">
              <p className="stat-label">Total Registered Users</p>
              <h3 className="stat-number">{stats.totalUsers}</h3>
            </div>
          </div>
        </Link>

        <Link to="/admin/manage-courses">
          <div className="stat-card">
            <div className="stat-icon courses-icon">📚</div>
            <div className="stat-details">
              <p className="stat-label">Published Courses</p>
              <h3 className="stat-number">{stats.totalCourses}</h3>
            </div>
          </div>
        </Link>

        <Link to="/admin/manage-roadmaps">
          <div className="stat-card">
            <div className="stat-icon roadmaps-icon">🗺️</div>
            <div className="stat-details">
              <p className="stat-label">Career Roadmaps</p>
              <h3 className="stat-number">{stats.totalRoadmaps}</h3>
            </div>
          </div>
        </Link>

        <div className="stat-card">
          <div className="stat-icon active-icon">⚡</div>
          <div className="stat-details">
            <p className="stat-label">Active Sessions</p>
            <h3 className="stat-number">{stats.activeSessions}</h3>
          </div>
        </div>

        {/* Suggestions Card */}
        <Link to="/admin/manage-suggestions">
          <div className="stat-card">
            <div className="stat-icon suggestions-icon">💡</div>
            <div className="stat-details">
              <p className="stat-label">User Suggestions</p>
              <h3 className="stat-number">{feedbackCounts.totalSuggestions}</h3>
              {feedbackCounts.unreadSuggestions > 0 && (
                <span className="stat-unread-pill">
                  {feedbackCounts.unreadSuggestions} unread
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Complaints Card */}
        <Link to="/admin/manage-complaints">
          <div className="stat-card">
            <div className="stat-icon complaints-icon">🚩</div>
            <div className="stat-details">
              <p className="stat-label">User Complaints</p>
              <h3 className="stat-number">{feedbackCounts.totalComplaints}</h3>
              {feedbackCounts.unreadComplaints > 0 && (
                <span className="stat-unread-pill complaints-pill">
                  {feedbackCounts.unreadComplaints} unread
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      <div className="dashboard-lower-grid">

        {/* 2. Recent Activity Table */}
        <div className="recent-activity-section">
          <div className="section-header">
            <h3>Recently Joined Users</h3>
            <button className="view-all-btn" onClick={() => navigate('/admin/manage-users')}>View All</button>
          </div>

          <div className="table-container">
            <table className="admin-table">
              <thead className='table-head'>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="font-semibold text-dark">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.date}</td>
                    <td>
                      <span className={`role-badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Quick Actions Panel */}
        <div className="quick-actions-section">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate('/admin/add-course')}>
              <span className="action-icon">➕</span>
              <span className="action-text">Create New Course</span>
            </button>
            <button className="action-btn" onClick={() => navigate('/admin/add-roadmap')}>
              <span className="action-icon">🛤️</span>
              <span className="action-text">Build Roadmap</span>
            </button>
            <button className="action-btn" onClick={() => navigate('/admin/manage-suggestions')}>
              <span className="action-icon">💡</span>
              <span className="action-text">View Suggestions</span>
              {feedbackCounts.unreadSuggestions > 0 && (
                <span className="action-badge">{feedbackCounts.unreadSuggestions}</span>
              )}
            </button>
            <button className="action-btn" onClick={() => navigate('/admin/manage-complaints')}>
              <span className="action-icon">🚩</span>
              <span className="action-text">View Complaints</span>
              {feedbackCounts.unreadComplaints > 0 && (
                <span className="action-badge complaints-action-badge">{feedbackCounts.unreadComplaints}</span>
              )}
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

export default DashboardHome;