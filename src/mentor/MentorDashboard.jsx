import { useState, useEffect, Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../admin/AdminDashboard.css'; // Reusing base layout styles
import './MentorDashboard.css';
import SkeletonLoader from '../component/SkeletonLoader';
import { showSuccessAlert } from '../utils/customAlert';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookOpen, Map, Home, LogOut, Menu, X, Rocket, Award, Users } from 'lucide-react';

const navVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchMentorInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const role = response.data.data.role;
        if (role === 'mentor' || role === 'admin') {
          setIsMentor(true);
          setUser(response.data.data);
        } else {
          navigate('/profile');
        }
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchMentorInfo();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`, {}, {
          withCredentials: true,
          headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
      });
    } catch (error) {
      console.error("Logout failed");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      await showSuccessAlert("Logged out successfully!");
      window.location.href = '/login';
    }
  };

  if (loading) return <div className="mentor-loader"><SkeletonLoader type="profile" /></div>;

  return (
    <div className="admin-dashboard-wrapper mentor-theme">
      {/* Mobile Toggle */}
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header mentor-header">
          <div className="mentor-badge-main">
            <Award size={20} className="badge-icon" />
            <span>Mentor Portal</span>
          </div>
          <h2>{user?.firstName}</h2>
          <p>Content Curator</p>
        </div>

        <nav className="sidebar-nav">
          <motion.div custom={0} variants={navVariants} initial="hidden" animate="visible">
            <NavLink to="/mentor/dashboard" className="nav-link" end onClick={() => setIsSidebarOpen(false)}>
              <div className="nav-link-content">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </div>
            </NavLink>
          </motion.div>

          <motion.div custom={1} variants={navVariants} initial="hidden" animate="visible">
            <NavLink to="/mentor/manage-courses" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
              <div className="nav-link-content">
                <BookOpen size={20} />
                <span>Manage Courses</span>
              </div>
            </NavLink>
          </motion.div>

          <motion.div custom={2} variants={navVariants} initial="hidden" animate="visible">
            <NavLink to="/mentor/manage-roadmaps" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
              <div className="nav-link-content">
                <Map size={20} />
                <span>Manage Roadmaps</span>
              </div>
            </NavLink>
          </motion.div>

          <div className="sidebar-divider">Secondary</div>

          <motion.div custom={3} variants={navVariants} initial="hidden" animate="visible">
            <NavLink to="/" className="nav-link" onClick={() => setIsSidebarOpen(false)}>
              <div className="nav-link-content">
                <Home size={20} />
                <span>Return to Site</span>
              </div>
            </NavLink>
          </motion.div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn-sidebar" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content mentor-content">
        <header className="admin-topbar mentor-topbar">
          <div className="welcome-text">
            <h1>Welcome back, <span className="gradient-text">{user?.firstName}</span>!</h1>
            <p>Ready to guide the next generation of professionals?</p>
          </div>
          
          <div className="mentor-metrics">
            <div className="metric-item">
              <Rocket size={18} />
              <span>Contribute</span>
            </div>
          </div>
        </header>

        <div className="content-scroll-area">
          <Suspense fallback={<div className="p-4"><SkeletonLoader type="table" /></div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorDashboard;
