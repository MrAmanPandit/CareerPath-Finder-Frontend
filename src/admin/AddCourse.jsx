import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddCourse.css";

const AddCourse = () => {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    
    const [course, setCourse] = useState({
        name: "",
        duration: "",
        description: "",
        eligibility: "",
        addmissionProcess: "",
        governmentCollegesFees: "",
        privateCollegesFees: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: "", type: "" });

        try {
            // Send a POST request to your backend URL
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/admin/add-course`, {
                name: course.name,
                duration: Number(course.duration),
                description: course.description,
                eligibility: course.eligibility,
                addmissionProcess: course.addmissionProcess,
                governmentCollegesFees: course.governmentCollegesFees,
                privateCollegesFees: course.privateCollegesFees
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            // Handle the successful response
            console.log("Success!", response.data);
            setMessage({ text: "Course added successfully!", type: "success" });
            
            // Clear form
            setCourse({
                name: "",
                duration: "",
                description: "",
                eligibility: "",
                addmissionProcess: "",
                governmentCollegesFees: "",
                privateCollegesFees: ""
            });

        } catch (error) {
            // Catch errors sent by your backend
            console.error("Error adding course:", error.response?.data?.message || error.message);
            setMessage({ 
                text: error.response?.data?.message || "Failed to add course. Please try again.", 
                type: "error" 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-course-wrapper">
            <div className="add-course-container">
                
                <header className="form-header">
                    <h2 style={{color: "var(--text-color)"}}>Create New Course</h2>
                    <p>Fill out the details below to publish a new course to the platform.</p>
                </header>

                {message.text && (
                    <div className={`status-banner ${message.type === 'success' ? 'banner-success' : 'banner-error'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="course-form">
                    
                    <div className="form-section">
                        <h3 style={{color: "var(--text-color)"}}>General Information</h3>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Course Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={course.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. B.Tech Computer Science"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Duration (in Years)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={course.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 4"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group full-width" style={{ marginTop: '20px' }}>
                            <label>Course Description</label>
                            <textarea
                                name="description"
                                value={course.description}
                                onChange={handleInputChange}
                                placeholder="Write a detailed description about the course..."
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 style={{color: "var(--text-color)"}}>Requirements & Process</h3>
                        <div className="input-group full-width">
                            <label>Eligibility Criteria</label>
                            <textarea
                                name="eligibility"
                                value={course.eligibility}
                                onChange={handleInputChange}
                                placeholder="e.g. 10+2 with Physics, Chemistry, Mathematics (Minimum 60%)"
                                rows="3"
                                required
                            />
                        </div>
                        <div className="input-group full-width">
                            <label>Admission Process</label>
                            <textarea
                                name="addmissionProcess"
                                value={course.addmissionProcess}
                                onChange={handleInputChange}
                                placeholder="e.g. Entrance Exams like JEE Main, State CETs, or Merit Based"
                                rows="3"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 style={{color:"var(--text-color)"}}>Fee Structure Estimates</h3>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Government Colleges Fees</label>
                                <input
                                    type="text"
                                    name="governmentCollegesFees"
                                    value={course.governmentCollegesFees}
                                    onChange={handleInputChange}
                                    placeholder="e.g. ₹50,000 - ₹2,000,000 per year"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Private Colleges Fees</label>
                                <input
                                    type="text"
                                    name="privateCollegesFees"
                                    value={course.privateCollegesFees}
                                    onChange={handleInputChange}
                                    placeholder="e.g. ₹1,00,000 - ₹5,00,000 per year"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-course-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Publishing...' : 'Publish Course to Database'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddCourse;