import React from 'react';
import './Courses.css'; // Reuses the exact same CSS file!
import AnimatedPage from '../component/animation';
import SaveCourseBtn from '../component/SaveCourseBtn';

import { Cpu, Building2, Monitor, Ship, ShieldCheck, Sigma, Bot } from 'lucide-react';

const MathCourses = () => {
  const courseCategories = [
    {
      title: "Engineering & Technology",
      icon: <Cpu size={28} />,
      courses: [
        { name: "B.Tech CSE", detail: "Computer Science & Engineering", duration: "4 Years" },
        { name: "B.Tech Mechanical", detail: "Machines & Manufacturing", duration: "4 Years" },
        { name: "B.Tech Civil", detail: "Construction & Infrastructure", duration: "4 Years" },
        { name: "B.Tech ECE", detail: "Electronics & Communication", duration: "4 Years" },
        { name: "B.Tech Aerospace", detail: "Aircraft & Spacecraft", duration: "4 Years" }
      ]
    },
    {
      title: "Architecture & Planning",
      icon: <Building2 size={28} />,
      courses: [
        { name: "B.Arch", detail: "Bachelor of Architecture", duration: "5 Years" },
        { name: "B.Planning", detail: "Urban & Regional Planning", duration: "4 Years" },
        { name: "B.Des", detail: "Industrial & Product Design", duration: "4 Years" },
        { name: "B.Tech Interior", detail: "Interior Spatial Design", duration: "4 Years" }
      ]
    },
    {
      title: "Computer Applications & IT",
      icon: <Monitor size={28} />,
      courses: [
        { name: "BCA", detail: "Bachelor of Computer Applications", duration: "3-4 Years" },
        { name: "B.Sc. IT", detail: "Information Technology", duration: "3-4 Years" },
        { name: "B.Sc. CS", detail: "Computer Science", duration: "3-4 Years" },
        { name: "B.Sc. Data Science", detail: "Data Analytics & Processing", duration: "3-4 Years" }
      ]
    },
    {
      title: "Merchant Navy & Aviation",
      icon: <Ship size={28} />,
      courses: [
        { name: "B.Tech Marine", detail: "Marine Engineering", duration: "4 Years" },
        { name: "B.Sc. Nautical", detail: "Nautical Science", duration: "3 Years" },
        { name: "CPL Training", detail: "Commercial Pilot License", duration: "1.5-2 Years" },
        { name: "B.Sc. Aviation", detail: "Aviation Operations", duration: "3 Years" },
        { name: "AME", detail: "Aircraft Maintenance Engineering", duration: "2-4 Years" }
      ]
    },
    {
      title: "Defense Services",
      icon: <ShieldCheck size={28} />,
      courses: [
        { name: "NDA (Army)", detail: "National Defence Academy", duration: "3 + 1 Years" },
        { name: "NDA (Navy)", detail: "Naval Academy", duration: "3 + 1 Years" },
        { name: "NDA (Air Force)", detail: "Air Force Academy", duration: "3 + 1 Years" },
        { name: "TES Entry", detail: "Technical Entry Scheme (Army)", duration: "4 + 1 Years" }
      ]
    },
    {
      title: "Pure Sciences & Math",
      icon: <Sigma size={28} />,
      courses: [
        { name: "B.Sc. Mathematics", detail: "Advanced Math & Theorems", duration: "3-4 Years" },
        { name: "B.Sc. Physics", detail: "Quantum Mechanics & Matter", duration: "3-4 Years" },
        { name: "B.Sc. Chemistry", detail: "Chemical Sciences", duration: "3-4 Years" },
        { name: "B.Stat", detail: "Bachelor of Statistics (ISI)", duration: "3-4 Years" },
        { name: "B.Math", detail: "Bachelor of Mathematics (ISI)", duration: "3-4 Years" }
      ]
    },
    {
      title: "Emerging Technologies",
      icon: <Bot size={28} />,
      courses: [
        { name: "B.Tech AI & ML", detail: "Artificial Intelligence", duration: "4 Years" },
        { name: "B.Tech Robotics", detail: "Robotics & Automation", duration: "4 Years" },
        { name: "B.Tech Cyber Sec", detail: "Cyber Security & Networks", duration: "4 Years" },
        { name: "B.Tech Mechatronics", detail: "Mechanics + Electronics", duration: "4 Years" },
        { name: "B.Tech IoT", detail: "Internet of Things", duration: "4 Years" }
      ]
    }
  ];

  return (
   <AnimatedPage>
    <div className="coursesWrapper">
      <div className="coursesHeader">
        <h1 className="coursesTitle">Mathematics Stream <span className="text-gradient">Courses</span></h1>
        <p className="coursesSubtitle">Explore an expanded list of top engineering, science, and tech degrees available after 12th PCM.</p>
      </div>

      <div className="coursesGrid">
        {courseCategories.map((category, index) => (
          <div className="categoryCard" key={index}>
            <div className="categoryHeader">
              <span className="categoryIcon">{category.icon}</span>
              <h2 className="categoryTitle">{category.title}</h2>
            </div>
            
            <ul className="courseList">
              {category.courses.map((course, idx) => (
                <li className="courseItem" key={idx}>
                  <div className="courseInfo">
                    <span className="courseName">{course.name}</span>
                    <span className="courseDetail">{course.detail}</span>
                  </div>
                  <div className="courseActions">
                    <span className="courseDuration">{course.duration}</span>
                    <SaveCourseBtn courseName={course.name} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </AnimatedPage>
  );
};

export default MathCourses;