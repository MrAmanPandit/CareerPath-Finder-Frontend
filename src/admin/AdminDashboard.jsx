import { useState, useEffect, Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import SkeletonLoader from '../component/SkeletonLoader';
import { color } from 'framer-motion';
import { showSuccessAlert } from '../utils/customAlert';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        if (response.data.message.role === 'admin') {
          setIsAdmin(true);
          setAdminName(response.data.message.firstName);
        } else {
          setIsAdmin(true); // Allow non-admins to stay
          setAdminName("Guest Admin");
        }
      } catch (error) {
        setIsAdmin(true); // Allow unauthenticated to stay
        setAdminName("Guest");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminInfo();
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
          {/* NavLink automatically adds an 'active' class when clicked! */}
          <NavLink to="/admin/dashboard" onClick={() => setIsSidebarOpen(false)} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            📊 Dashboard Home
          </NavLink>
          <NavLink to="/admin/manage-users" onClick={() => setIsSidebarOpen(false)} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            👥 Manage Users
          </NavLink>
           <NavLink to="/admin/manage-courses" onClick={() => setIsSidebarOpen(false)} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            📚 Manage Courses
          </NavLink>
          <NavLink to="/admin/manage-roadmaps" onClick={() => setIsSidebarOpen(false)} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            🗺️ Manage Roadmaps
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </div>
      </aside>

      {/* 2. The Main Content Side */}
      <main className="admin-main-content">
        
        {/* Top bar for extra tools or profile info */}
        <header className="admin-topbar">
          <button
            className={`hamburger-menu ${isSidebarOpen ? 'open' : ''}`}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <span className="h-bar hbar1"></span>
            <span className="h-bar hbar2"></span>
            <span className="h-bar hbar3"></span>
          </button>
          <span style={{color:"#594ae6ff",fontWeight:"500"}}>Welcome back, <span style={{color:"#9f309dff",fontWeight:"bold",fontStyle:'italic'}}>Mr./ Ms./ Mrs. {adminName}</span></span>
        </header>

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