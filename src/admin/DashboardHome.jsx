import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardHome.css';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Mock data representing what your backend will eventually send
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRoadmaps: 0,
    activeSessions: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/dashboard-stats`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        if (response.data) {
          setStats(response.data.stats);
          setRecentUsers(response.data.recentUsers);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading analytics engine...</div>;
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