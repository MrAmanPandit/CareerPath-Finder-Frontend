import React from 'react';
import './Courses.css'; // Reuses the exact same CSS file!
import AnimatedPage from '../component/animation';

const ArtsCourses = () => {
  const courseCategories = [
    {
      title: "Humanities & Social Sciences",
      icon: "🌍",
      courses: [
        { name: "B.A. Psychology", detail: "Human Behavior & Mind", duration: "3-4 Years" },
        { name: "B.A. Political Science", detail: "Government & Politics", duration: "3-4 Years" },
        { name: "B.A. History", detail: "Past Events & Civilizations", duration: "3-4 Years" },
        { name: "B.A. Sociology", detail: "Society & Human Interaction", duration: "3-4 Years" },
        { name: "B.A. Geography", detail: "Earth, Landscapes & Environment", duration: "3-4 Years" }
      ]
    },
    {
      title: "Literature & Languages",
      icon: "📚",
      courses: [
        { name: "B.A. English (Hons)", detail: "English Literature & Grammar", duration: "3-4 Years" },
        { name: "B.A. Regional Languages", detail: "Hindi, Sanskrit, Tamil, etc.", duration: "3-4 Years" },
        { name: "B.A. Foreign Languages", detail: "French, German, Spanish, etc.", duration: "3-4 Years" },
        { name: "B.A. Linguistics", detail: "Scientific Study of Language", duration: "3-4 Years" }
      ]
    },
    {
      title: "Media, Journalism & Comm.",
      icon: "🎙️",
      courses: [
        { name: "BJMC", detail: "Journalism & Mass Comm.", duration: "3-4 Years" },
        { name: "BMM", detail: "Bachelor of Mass Media", duration: "3-4 Years" },
        { name: "B.A. Photography", detail: "Commercial & Fine Art Photography", duration: "3 Years" },
        { name: "Diploma in PR", detail: "Public Relations & Advertising", duration: "1-2 Years" },
        { name: "B.Sc. Film Making", detail: "Direction, Editing & Cinematography", duration: "3-4 Years" }
      ]
    },
    {
      title: "Law & Legal Studies",
      icon: "⚖️",
      courses: [
        { name: "B.A. + LL.B.", detail: "Integrated Arts & Law", duration: "5 Years" },
        { name: "BBA + LL.B.", detail: "Integrated Management & Law", duration: "5 Years" },
        { name: "CS", detail: "Company Secretary", duration: "3-4 Years" }
      ]
    },
    {
      title: "Design & Fine Arts",
      icon: "🎨",
      courses: [
        { name: "B.Des", detail: "Fashion, Graphic, or UI/UX Design", duration: "4 Years" },
        { name: "BFA", detail: "Bachelor of Fine Arts (Painting, Sculpture)", duration: "3-4 Years" },
        { name: "B.Sc. Animation", detail: "Animation, VFX & Gaming", duration: "3-4 Years" },
        { name: "B.A. Interior Design", detail: "Interior Architecture & Spaces", duration: "3-4 Years" }
      ]
    },
    {
      title: "Hospitality & Tourism",
      icon: "🏨",
      courses: [
        { name: "BHM", detail: "Bachelor of Hotel Management", duration: "3-4 Years" },
        { name: "BTTM", detail: "Travel & Tourism Management", duration: "3-4 Years" },
        { name: "Event Management", detail: "BBA/Diploma in Event Mgmt", duration: "1-3 Years" },
        { name: "Culinary Arts", detail: "Professional Chef & Catering", duration: "3-4 Years" },
        { name: "Aviation/Cabin Crew", detail: "Diploma in Aviation Hospitality", duration: "1-2 Years" }
      ]
    },
    {
      title: "Management & Performing Arts",
      icon: "🎭",
      courses: [
        { name: "BBA", detail: "Bachelor of Business Administration", duration: "3-4 Years" },
        { name: "BPA", detail: "Bachelor of Performing Arts (Dance, Music, Theater)", duration: "3-4 Years" },
        { name: "IPM", detail: "Integrated Program in Mgmt (BBA+MBA)", duration: "5 Years" },
        { name: "B.A. Retail Mgmt", detail: "Retail & Supply Chain Operations", duration: "3-4 Years" }
      ]
    }
  ];

  return (
    <AnimatedPage>
    <div className="coursesWrapper">
      <div className="coursesHeader">
        <h1 className="coursesTitle">Arts & Humanities Courses</h1>
        <p className="coursesSubtitle">Explore an expansive list of creative, administrative, and humanities degrees available after 12th Arts.</p>
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

export default ArtsCourses;