import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import SkeletonLoader from './component/SkeletonLoader.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('./component/home.jsx'))
const Stream = lazy(() => import('./component/stream.jsx'))
const AboutUs = lazy(() => import('./component/aboutUs.jsx'))
const Contact = lazy(() => import('./component/contactUs.jsx'))
const Login = lazy(() => import('./component/login.jsx'))
const Signup = lazy(() => import('./component/signup.jsx'))
const BiologyCourses = lazy(() => import('./streams/biologyCourses.jsx'))
const MathCourses = lazy(() => import('./streams/mathCourses.jsx'))
const CommerceCourses = lazy(() => import('./streams/commerceCourses.jsx'))
const ArtCourses = lazy(() => import('./streams/artCourses.jsx'))
const Profile = lazy(() => import('./component/profile.jsx'))
const Career = lazy(() => import('./component/career.jsx'))
const SoftwareEngineer = lazy(() => import('./roadmaps/softwareEngineer.jsx'))
const InvestmentBanker = lazy(() => import('./roadmaps/investmentBanker.jsx'))
const ClinicalPsychologistRoadmap = lazy(() => import('./roadmaps/clinicalPsychologist.jsx'))
const CommercialPilotRoadmap = lazy(() => import('./roadmaps/commercialPilot.jsx'))
const UiUxRoadmap = lazy(() => import('./roadmaps/uiDesigner.jsx'))
const DataScientistRoadmap = lazy(() => import('./roadmaps/dataScientist.jsx'))
const EditDetails = lazy(() => import('./component/editDetail.jsx'))
const RoadmapSearchPage = lazy(() => import('./component/roadmapSearchPage.jsx'))
const RoadmapCollection = lazy(() => import('./component/roadmapCollection.jsx'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'))
const DashboardHome = lazy(() => import('./admin/DashboardHome.jsx'))
const AddCourse = lazy(() => import('./admin/AddCourse.jsx'))
const AddRoadmap = lazy(() => import('./admin/AddRoadmap.jsx'))
const ManageUsers = lazy(() => import('./admin/ManageUsers.jsx'))
const ManageCourses = lazy(() => import('./admin/ManageCourses.jsx'))
const ManageRoadmaps = lazy(() => import('./admin/ManageRoadmap.jsx'))
const UpdateRoadmap = lazy(() => import('./admin/UpdateRoadmap.jsx'))
const UpdateCourse = lazy(() => import('./admin/UpdateCourse.jsx'))

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
    <Suspense fallback={<SkeletonLoader type="text" />}>
      <RouterProvider router={routers} />
    </Suspense>
  </StrictMode>
)
