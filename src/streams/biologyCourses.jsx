import React from 'react';
import './Courses.css';

const BiologyCourses = () => {
  const courseCategories = [
    {
      title: "Core Medical & Dental",
      icon: "🩺",
      courses: [
        { name: "MBBS", detail: "Medicine and Surgery", duration: "5.5 Years" },
        { name: "BDS", detail: "Dental Surgery", duration: "5 Years" }
      ]
    },
    {
      title: "AYUSH (Alternative Medicine)",
      icon: "🌿",
      courses: [
        { name: "BAMS", detail: "Ayurvedic Medicine", duration: "5.5 Years" },
        { name: "BHMS", detail: "Homeopathic Medicine", duration: "5.5 Years" },
        { name: "BUMS", detail: "Unani Medicine", duration: "5.5 Years" },
        { name: "BNYS", detail: "Naturopathy & Yogic Sciences", duration: "5.5 Years" },
        { name: "BSMS", detail: "Siddha Medicine", duration: "5.5 Years" }
      ]
    },
    {
      title: "Veterinary & Agriculture",
      icon: "🐾",
      courses: [
        { name: "BVSc & AH", detail: "Veterinary Science", duration: "5.5 Years" },
        { name: "B.Sc. Ag.", detail: "Agriculture", duration: "4 Years" },
        { name: "B.Sc. Horticulture", detail: "Plant Cultivation", duration: "4 Years" },
        { name: "B.F.Sc.", detail: "Fisheries Science", duration: "4 Years" },
        { name: "B.Sc. Forestry", detail: "Forestry & Wildlife", duration: "4 Years" }
      ]
    },
    {
      title: "Pharmacy & Nursing",
      icon: "💊",
      courses: [
        { name: "Pharm.D", detail: "Doctor of Pharmacy", duration: "6 Years" },
        { name: "B.Pharm", detail: "Bachelor of Pharmacy", duration: "4 Years" },
        { name: "D.Pharm", detail: "Diploma in Pharmacy", duration: "2 Years" },
        { name: "B.Sc. Nursing", detail: "Clinical Nursing", duration: "4 Years" },
        { name: "GNM", detail: "Gen. Nursing & Midwifery", duration: "3.5 Years" },
        { name: "ANM", detail: "Auxiliary Nursing Midwifery", duration: "2 Years" }
      ]
    },
    {
      title: "Allied Health & Paramedical",
      icon: "🔬",
      courses: [
        { name: "BPT", detail: "Physiotherapy", duration: "4.5 Years" },
        { name: "BOT", detail: "Occupational Therapy", duration: "4.5 Years" },
        { name: "BASLP", detail: "Audiology & Speech Therapy", duration: "4 Years" },
        { name: "B.Sc. Optometry", detail: "Eye Care & Vision", duration: "4 Years" },
        { name: "B.Sc. MLT", detail: "Medical Lab Tech", duration: "3-4 Years" },
        { name: "B.Sc. Anesthesia", detail: "Anesthesia Technology", duration: "3-4 Years" },
        { name: "B.Sc. MIT", detail: "Medical Imaging (Radiology)", duration: "3-4 Years" }
      ]
    },
    {
      title: "Pure Sciences (B.Sc.)",
      icon: "🧬",
      courses: [
        { name: "B.Sc. Zoology", detail: "Study of Animals", duration: "3-4 Years" },
        { name: "B.Sc. Botany", detail: "Study of Plants", duration: "3-4 Years" },
        { name: "B.Sc. Biochemistry", detail: "Chemical Processes in Living Beings", duration: "3-4 Years" },
        { name: "B.Sc. Microbio", detail: "Microscopic Organisms", duration: "3-4 Years" },
        { name: "B.Sc. Genetics", detail: "Heredity & Genes", duration: "3-4 Years" }
      ]
    },
    {
      title: "Emerging & Interdisciplinary",
      icon: "🚀",
      courses: [
        { name: "B.Tech Biotech", detail: "Technology & Biology", duration: "4 Years" },
        { name: "B.Sc. Forensic", detail: "Crime Scene Investigation", duration: "3-4 Years" },
        { name: "B.Sc. Marine Biology", detail: "Ocean Ecosystems", duration: "3-4 Years" },
        { name: "B.Sc. Food Tech", detail: "Food Processing & Quality", duration: "3-4 Years" },
        { name: "B.Sc. Env. Science", detail: "Ecology & Environment", duration: "3-4 Years" }
      ]
    }
  ];

  return (
    <div className="coursesWrapper">
      <div className="coursesHeader">
        <h1 className="coursesTitle">Biology Stream Courses</h1>
        <p className="coursesSubtitle">Explore an expanded list of top career paths and degrees available after 12th PCB.</p>
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
  );
};

export default BiologyCourses;