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
      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* 1. The Fixed Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>CareerPath</h2>
          <p>Mentor Workspace</p>
          {/* Mobile Close Button */}
          <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
            &times;
          </button>
        </div>

        <nav className="sidebar-nav">
          {[
            { to: "/mentor/dashboard", label: "📊 Dashboard Home", end: true },
            { to: "/mentor/manage-courses", label: "📚 Manage Courses" },
            { to: "/mentor/manage-roadmaps", label: "🗺️ Manage Roadmaps" },
            { to: "/admin/dashboard", label: "👨‍🏫 Admin Panel", adminOnly: true },
            { to: "/", label: "🏠 Return to Site" }
          ].map((item, i) => (
             item.adminOnly && user?.role !== 'admin' ? null : (
              <motion.div 
                key={item.to} 
                custom={i} 
                variants={navVariants} 
                initial="hidden" 
                animate="visible"
              >
                <NavLink 
                  to={item.to} 
                  className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                  end={item.end} 
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="nav-link-content">
                    {item.label}
                  </span>
                </NavLink>
              </motion.div>
             )
          ))}
        </nav>

        <motion.div 
          className="sidebar-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </motion.div>
      </aside>

      {/* 2. The Main Content Side */}
      <main className="admin-main-content">
        <motion.header 
          className="admin-topbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            className={`hamburger-menu ${isSidebarOpen ? 'open' : ''}`}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <span className="h-bar hbar1"></span>
            <span className="h-bar hbar2"></span>
            <span className="h-bar hbar3"></span>
          </button>

          <div className="admin-welcome-flex">
            <span className="welcome-text">Welcome back, Mentor <span className="admin-name-highlight"> {user?.firstName}</span></span>
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="admin-topbar-avatar" />
            ) : (
              <div className="admin-topbar-avatar-placeholder">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </motion.header>

        <div className="admin-content-area mentor-content">
          <div className="content-scroll-area">
            <Suspense fallback={<div className="p-4"><SkeletonLoader type="table" /></div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
