import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import Home from './component/home.jsx'
import Stream from './component/stream.jsx'
import AboutUs from './component/aboutUs.jsx'
import Contact from './component/contactUs.jsx'
import Login from './component/login.jsx'
import Signup from './component/signup.jsx'
import BiologyCourses from './streams/biologyCourses.jsx'
import MathCourses from './streams/mathCourses.jsx'
import CommerceCourses from './streams/commerceCourses.jsx'
import ArtCourses from './streams/artCourses.jsx'
import Profile from './component/profile.jsx'
import Career from './component/career.jsx'
import SoftwareEngineer from './roadmaps/softwareEngineer.jsx'
import InvestmentBanker from './roadmaps/investmentBanker.jsx'
import ClinicalPsychologistRoadmap from './roadmaps/clinicalPsychologist.jsx'
import CommercialPilotRoadmap from './roadmaps/commercialPilot.jsx'
import UiUxRoadmap from './roadmaps/uiDesigner.jsx'
import DataScientistRoadmap from './roadmaps/dataScientist.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import EditDetails from './component/editDetail.jsx'
import RoadmapSearchPage from './component/roadmapSearchPage.jsx'
import RoadmapCollection from './component/roadmapCollection.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import DashboardHome from './admin/DashboardHome.jsx'
import AddCourse from './admin/AddCourse.jsx'
import AddRoadmap from './admin/AddRoadmap.jsx'
import ManageUsers from './admin/ManageUsers.jsx'
import ManageCourses from './admin/ManageCourses.jsx'
import ManageRoadmaps from './admin/ManageRoadmap.jsx'
import UpdateRoadmap from './admin/UpdateRoadmap.jsx'
import UpdateCourse from './admin/UpdateCourse.jsx'



const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('accessToken'); // Check for token in localStorage

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null; // Render children if authenticated, otherwise render nothing
};
const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/admin",
        element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
        children: [{
          path: "dashboard",
          element: <ProtectedRoute><DashboardHome /></ProtectedRoute>
        },
        {
          path: "add-course",
          element: <ProtectedRoute><AddCourse /></ProtectedRoute>
        },
        {
          path: "add-roadmap",
          element: <ProtectedRoute><AddRoadmap /></ProtectedRoute>
        },
        {
          path: "manage-users",
          element: <ProtectedRoute><ManageUsers /></ProtectedRoute>
        },
        {
          path: "manage-courses",
          element: <ProtectedRoute><ManageCourses /></ProtectedRoute>
        },
        {
          path: "manage-roadmaps",
          element: <ProtectedRoute><ManageRoadmaps /></ProtectedRoute>
        },
        {
          path: "update-course/:id",
          element: <ProtectedRoute><UpdateCourse /></ProtectedRoute>
        },
        {
          path: "update-roadmap/:id",
          element: <ProtectedRoute><UpdateRoadmap /></ProtectedRoute>
        }
        ]
      },
      {
        path: "/streams",
        element: <Stream />,
      },
      {
        path: "/about",
        element: <AboutUs />
      },
      {
        path: "/contact",
        element: <ProtectedRoute><Contact /></ProtectedRoute>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/streams/biology",
        element: <ProtectedRoute><BiologyCourses /></ProtectedRoute>
      },
      {
        path: "/streams/maths",
        element: <ProtectedRoute> <MathCourses /></ProtectedRoute>
      },
      {
        path: "/streams/commerce",
        element: <ProtectedRoute> <CommerceCourses /></ProtectedRoute>
      },
      {
        path: "/streams/arts",
        element: <ProtectedRoute> <ArtCourses /></ProtectedRoute>
      },
      {
        path: "/profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "/edit-details",
        element: <ProtectedRoute><EditDetails /></ProtectedRoute>
      },
      {
        path: "/career",
        element: <Career />
      },
      {
        path: "/career/roadmap/software-engineer",
        element: <ProtectedRoute><SoftwareEngineer /></ProtectedRoute>
      },
      {
        path: "/career/roadmap/investment-banker",
        element: <ProtectedRoute><InvestmentBanker /></ProtectedRoute>
      },
      {
        path: "/career/roadmap/clinical-psychologist",
        element: <ProtectedRoute><ClinicalPsychologistRoadmap /></ProtectedRoute>
      },
      {
        path: "/career/roadmap/commercial-pilot",
        element: <ProtectedRoute><CommercialPilotRoadmap /></ProtectedRoute>
      },
      {
        path: "/career/roadmap/ui-ux-designer",
        element: <ProtectedRoute><UiUxRoadmap /></ProtectedRoute>
      },
      {
        path: "/career/roadmap/data-scientist",
        element: <ProtectedRoute><DataScientistRoadmap /></ProtectedRoute>
      },
      {
        path: "/career/roadmap/search",
        element: <RoadmapSearchPage />
      },
      {
        path: "/admin/roadmap/collection",
        element: <RoadmapCollection />
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
)
