import { useState, useEffect, Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import SkeletonLoader from '../component/SkeletonLoader';
import { color } from 'framer-motion';
import { showSuccessAlert } from '../utils/customAlert';
import { motion, AnimatePresence } from 'framer-motion';

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

const topbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "backOut" } 
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({ unreadSuggestions: 0, unreadComplaints: 0 });

  // Protect the entire dashboard
  // Dashboard data loading (No longer restricted)
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        if (response.data.data.role === 'admin') {
          setIsAdmin(true);
          setUser(response.data.data);
        } else {
          setIsAdmin(true); // Allow non-admins to stay
          setUser({ firstName: "Guest Admin", role: "admin" });
        }
      } catch (error) {
        setIsAdmin(true); // Allow unauthenticated to stay
        setUser({ firstName: "Guest", role: "admin" });
      } finally {
        setLoading(false);
      }
    };
    fetchAdminInfo();

    // Fetch unread feedback counts for sidebar badges
    const fetchUnreadCounts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/contact/counts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        });
        if (res.data?.data) {
          setUnreadCounts(res.data.data);
        }
      } catch {
        // silently fail – counts are non-critical
      }
    };
    fetchUnreadCounts();
  }, []);

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

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}><SkeletonLoader type="text" /></div>;
  if (!isAdmin) return null;

  return (
    <div className="admin-dashboard-wrapper">
      
      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* 1. The Fixed Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>CareerPath</h2>
          <p>Admin Workspace</p>
          {/* Mobile Close Button */}
          <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
            &times;
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {[
            { to: "/admin/dashboard", label: "📊 Dashboard Home" },
            { to: "/admin/manage-users", label: "👥 Manage Users" },
            { to: "/admin/manage-courses", label: "📚 Manage Courses" },
            { to: "/admin/manage-roadmaps", label: "🗺️ Manage Roadmaps" },
            { to: "/admin/manage-suggestions", label: "💡 User Suggestions", type: 'suggestions' },
            { to: "/admin/manage-complaints", label: "🚩 User Complaints", type: 'complaints' }
          ].map((item, i) => (
            <motion.div
              key={item.to}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navVariants}
            >
              <NavLink 
                to={item.to} 
                onClick={() => setIsSidebarOpen(false)} 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
              >
                <span className="nav-link-content">
                  {item.type === 'suggestions' && unreadCounts.unreadSuggestions > 0 && (
                    <span className="sidebar-badge suggestions-badge">{unreadCounts.unreadSuggestions}</span>
                  )}
                  {item.type === 'complaints' && unreadCounts.unreadComplaints > 0 && (
                    <span className="sidebar-badge complaints-badge">{unreadCounts.unreadComplaints}</span>
                  )}
                  {item.label}
                </span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <motion.div 
          className="sidebar-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </motion.div>
      </aside>

      {/* 2. The Main Content Side */}
      <main className="admin-main-content">
        
        {/* Top bar for extra tools or profile info */}
        <motion.header 
          className="admin-topbar"
          initial="hidden"
          animate="visible"
          variants={topbarVariants}
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
            <span className="welcome-text">Welcome back, <span className="admin-name-highlight">Mr. {user?.firstName}</span></span>
            {user?.avatar ? (
              <motion.img 
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={user.avatar} 
                alt="Admin Profile" 
                className="admin-topbar-avatar" 
              />
            ) : (
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="admin-topbar-avatar-placeholder"
              >
                {user?.firstName?.charAt(0).toUpperCase()}
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* 3. The Outlet - This is where your nested pages will render! */}
        <div className="admin-content-area">
          <Suspense fallback={<div style={{padding: '30px'}}><SkeletonLoader type="table" /></div>}>
            <Outlet /> 
          </Suspense>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;