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

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token'); // Check for token in localStorage

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
    children:[
      {
        path:"",
        element: <Home />
      },
      {
        path:"/streams",  
        element: <Stream />,
      },
      {
        path:"/about",  
        element: <AboutUs />
      },
      {
        path:"/contact",
        element: <Contact />
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/signup",
        element: <Signup />
      },
      {
        path:"/streams/biology",
        element: <BiologyCourses />
      },
      {
        path:"/streams/maths",
        element: <MathCourses />
      },
      {
        path:"/streams/commerce",
        element: <CommerceCourses />
      },
      {
        path:"/streams/arts",
        element: <ArtCourses />
      },
      {
        path:"/profile",
        element: <Profile />
      },
      {
        path:"/career",
        element:<Career />
      },
      {
        path:"/career/roadmap/software-engineer",
        element:<SoftwareEngineer />
      },
      {
        path:"/career/roadmap/investment-banker",
        element:<InvestmentBanker />
      },
      {
        path:"/career/roadmap/clinical-psychologist",
        element:<ClinicalPsychologistRoadmap />
      },
      {
        path:"/career/roadmap/commercial-pilot",
        element:<CommercialPilotRoadmap />
      },
      {
        path:"/career/roadmap/ui-ux-designer",
        element:<UiUxRoadmap />
      },
      {
        path:"/career/roadmap/data-scientist",
        element:<DataScientistRoadmap />
      },
    ]
  }
]);
createRoot(document.getElementById('root')).render(
   <StrictMode>
      <RouterProvider router={routers}/>
   </StrictMode> 
)
