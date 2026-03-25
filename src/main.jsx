import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import SkeletonLoader from './component/SkeletonLoader.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Stream = lazy(() => import('./component/stream.jsx'))
import Home from './component/home.jsx';
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
const UpdateRoadmap = lazy(() => import('./admin/ManageRoadmap.jsx'))
const UpdateCourse = lazy(() => import('./admin/UpdateCourse.jsx'))
const YamAiApp = lazy(() => import('./yam-ai/YamAiApp.jsx'))
const EducationAi = lazy(() => import('./yam-ai/EducationAi.jsx'))
const CareerAi = lazy(() => import('./yam-ai/CareerAi.jsx'))

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
        element: <AdminDashboard />,
        children: [{
          path: "dashboard",
          element: <DashboardHome />
        },
        {
          path: "add-course",
          element: <AddCourse />
        },
        {
          path: "add-roadmap",
          element: <AddRoadmap />
        },
        {
          path: "manage-users",
          element: <ManageUsers />
        },
        {
          path: "manage-courses",
          element: <ManageCourses />
        },
        {
          path: "manage-roadmaps",
          element: <ManageRoadmaps />
        },
        {
          path: "update-course/:id",
          element: <UpdateCourse />
        },
        {
          path: "update-roadmap/:id",
          element: <UpdateRoadmap />
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
        element: <Contact />
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
        element: <BiologyCourses />
      },
      {
        path: "/streams/maths",
        element: <MathCourses />
      },
      {
        path: "/streams/commerce",
        element: <CommerceCourses />
      },
      {
        path: "/streams/arts",
        element: <ArtCourses />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/edit-details",
        element: <EditDetails />
      },
      {
        path: "/career",
        element: <Career />
      },
      {
        path: "/career/roadmap/software-engineer",
        element: <SoftwareEngineer />
      },
      {
        path: "/career/roadmap/investment-banker",
        element: <InvestmentBanker />
      },
      {
        path: "/career/roadmap/clinical-psychologist",
        element: <ClinicalPsychologistRoadmap />
      },
      {
        path: "/career/roadmap/commercial-pilot",
        element: <CommercialPilotRoadmap />
      },
      {
        path: "/career/roadmap/ui-ux-designer",
        element: <UiUxRoadmap />
      },
      {
        path: "/career/roadmap/data-scientist",
        element: <DataScientistRoadmap />
      },
      {
        path: "/career/roadmap/search",
        element: <RoadmapSearchPage />
      },
      {
        path: "/admin/roadmap/collection",
        element: <RoadmapCollection />
      },
      {
        path: "/yam-ai",
        element: <YamAiApp />
      },
      {
        path: "/education-ai",
        element: <EducationAi />
      },
      {
        path: "/career-ai",
        element: <CareerAi />
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
)
