import React from 'react';
import './Courses.css'; // Reuses the exact same CSS file!
import AnimatedPage from '../component/animation';

const CommerceCourses = () => {
  const courseCategories = [
    {
      title: "Core Commerce & Accounting",
      icon: "📊",
      courses: [
        { name: "B.Com", detail: "Bachelor of Commerce (General)", duration: "3-4 Years" },
        { name: "B.Com (Hons)", detail: "Bachelor of Commerce (Honours)", duration: "3-4 Years" },
        { name: "BAF", detail: "B.Com in Accounting & Finance", duration: "3-4 Years" },
        { name: "BFM", detail: "B.Com in Financial Markets", duration: "3-4 Years" },
        { name: "B.Com (Taxation)", detail: "Specialization in Tax Procedures", duration: "3-4 Years" }
      ]
    },
    {
      title: "Professional Qualifications",
      icon: "💼",
      courses: [
        { name: "CA", detail: "Chartered Accountancy", duration: "4.5-5 Years" },
        { name: "CS", detail: "Company Secretary", duration: "3-4 Years" },
        { name: "CMA", detail: "Cost & Management Accountant", duration: "3-4 Years" },
        { name: "CFA", detail: "Chartered Financial Analyst", duration: "2-4 Years" },
        { name: "ACCA", detail: "Association of Chartered Certified Acct.", duration: "2-3 Years" }
      ]
    },
    {
      title: "Business & Management",
      icon: "👔",
      courses: [
        { name: "BBA", detail: "Bachelor of Business Administration", duration: "3-4 Years" },
        { name: "BMS", detail: "Bachelor of Management Studies", duration: "3-4 Years" },
        { name: "BBM", detail: "Bachelor of Business Management", duration: "3-4 Years" },
        { name: "IPM", detail: "Integrated Program in Mgmt (BBA+MBA)", duration: "5 Years" },
        { name: "BHM", detail: "Bachelor of Hotel Management", duration: "3-4 Years" }
      ]
    },
    {
      title: "Economics & Analytics",
      icon: "📈",
      courses: [
        { name: "B.A. Economics", detail: "Honours in Economics", duration: "3-4 Years" },
        { name: "B.Sc. Economics", detail: "Quantitative Economics", duration: "3-4 Years" },
        { name: "B.Sc. Statistics", detail: "Data & Statistical Analysis", duration: "3-4 Years" },
        { name: "BBA Analytics", detail: "Business & Data Analytics", duration: "3-4 Years" },
        { name: "Actuarial Science", detail: "Risk & Insurance Mathematics", duration: "Variable" }
      ]
    },
    {
      title: "Law (Integrated Degrees)",
      icon: "⚖️",
      courses: [
        { name: "B.Com + LL.B.", detail: "Integrated Commerce & Law", duration: "5 Years" },
        { name: "BBA + LL.B.", detail: "Integrated Management & Law", duration: "5 Years" },
        { name: "B.A. + LL.B.", detail: "Integrated Arts & Law", duration: "5 Years" }
      ]
    },
    {
      title: "Banking, Insurance & Finance",
      icon: "🏦",
      courses: [
        { name: "BBI", detail: "B.Com in Banking & Insurance", duration: "3-4 Years" },
        { name: "B.Voc Banking", detail: "Vocational Degree in Banking", duration: "3 Years" },
        { name: "Diploma in Banking", detail: "Banking & Financial Services", duration: "1-2 Years" },
        { name: "CFP", detail: "Certified Financial Planner", duration: "1-2 Years" }
      ]
    },
    {
      title: "Media, Design & Computers",
      icon: "🎨",
      courses: [
        { name: "BMM", detail: "Bachelor of Mass Media", duration: "3-4 Years" },
        { name: "BCA", detail: "Computer Applications (with Math)", duration: "3-4 Years" },
        { name: "B.Des", detail: "Bachelor of Design", duration: "4 Years" },
        { name: "Event Management", detail: "BBA/Diploma in Event Mgmt", duration: "1-3 Years" }
      ]
    }
  ];

  return (
    <AnimatedPage>
    <div className="coursesWrapper">
      <div className="coursesHeader">
        <h1 className="coursesTitle">Commerce Stream Courses</h1>
        <p className="coursesSubtitle">Explore the top degrees, professional certifications, and management paths available after 12th Commerce.</p>
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
                  <span className="courseDuration">{course.duration}</span>
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

export default CommerceCourses;