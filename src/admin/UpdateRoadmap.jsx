import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from '../component/SkeletonLoader';
import "./AddRoadmap.css";

const UpdateRoadmap = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    
    // 1. The main Job Title
    const [jobTitle, setJobTitle] = useState("");

    // 2. The dynamic nested state for Steps and their Courses
    const [steps, setSteps] = useState([
        {
            title: "",
            duration: "",
            description: "",
            courses: [""] 
        }
    ]);

    // Fetch existing roadmap data
    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/roadmaps/${id}`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });

                if (response.data && response.data.data) {
                    const data = response.data.data;
                    setJobTitle(data.jobTitle || "");
                    
                    if (data.steps && data.steps.length > 0) {
                        const formattedSteps = data.steps.map(step => ({
                            title: step.title || "",
                            duration: step.duration || "",
                            description: step.description || "",
                            // Ensure there is always at least one empty string input for courses if array is empty
                            courses: step.courses && step.courses.length > 0 ? step.courses : [""]
                        }));
                        setSteps(formattedSteps);
                    }
                }
            } catch (error) {
                console.error("Error fetching roadmap:", error);
                setMessage({ text: "Failed to load roadmap details.", type: "error" });
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchRoadmap();
        }
    }, [id]);

    // --- Handlers for Steps ---
    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        setSteps(updatedSteps);
    };

    const handleAddStep = () => {
        setSteps([
            ...steps, 
            { title: "", duration: "", description: "", courses: [""] }
        ]);
    };

    const handleRemoveStep = (indexToRemove) => {
        const updatedSteps = steps.filter((_, index) => index !== indexToRemove);
        setSteps(updatedSteps);
    };

    // --- Handlers for Nested Courses ---
    const handleCourseChange = (stepIndex, courseIndex, value) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].courses[courseIndex] = value;
        setSteps(updatedSteps);
    };

    const handleAddCourse = (stepIndex) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].courses.push(""); // Add a new blank string to this step's courses
        setSteps(updatedSteps);
    };

    const handleRemoveCourse = (stepIndex, courseIndexToRemove) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].courses = updatedSteps[stepIndex].courses.filter(
            (_, index) => index !== courseIndexToRemove
        );
        setSteps(updatedSteps);
    };

    // --- Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: "", type: "" });

        // Format the data perfectly for your Mongoose schema
        const formattedSteps = steps.map((step, index) => ({
            id: index + 1, // Generate order ID
            title: step.title,
            duration: step.duration,
            description: step.description,
            // Filter out blank course boxes
            courses: step.courses.filter(course => course.trim() !== "") 
        }));

        try {
            // Send PUT request to save changes
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/roadmaps/${id}`, {
                jobTitle: jobTitle.trim(),
                steps: formattedSteps
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            setMessage({ text: "Roadmap updated successfully!", type: "success" });
            
            setTimeout(() => {
                navigate("/admin/manage-roadmaps");
            }, 1500);

        } catch (error) {
            console.error("Error updating roadmap:", error.response?.data?.message || error.message);
            setMessage({ 
                text: error.response?.data?.message || "Failed to update roadmap. Please try again.", 
                type: "error" 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "50px" }}><SkeletonLoader type="form" /></div>;
    }

    return (
        <div className="add-roadmap-wrapper">
            <div className="add-roadmap-container">
                
                <header className="form-header">
                    <h2 style={{color:"var(--text-color)"}}>Update Career Roadmap</h2>
                    <p>Modify the step-by-step educational journey for: {jobTitle}</p>
                </header>

                {message.text && (
                    <div className={`status-banner ${message.type === 'success' ? 'banner-success' : 'banner-error'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="roadmap-form">
                    
                    {/* Job Title Section */}
                    <div className="form-section">
                        <h3 style={{color:"var(--text-color)"}}>Target Career</h3>
                        <div className="input-group full-width">
                            <label>Dream Job Title</label>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="e.g. Full Stack Software Engineer"
                                required
                                className="job-title-input"
                            />
                        </div>
                    </div>

                    {/* Dynamic Steps Section */}
                    <div className="form-section">
                        <h3 style={{color:"var(--text-color)"}}>Roadmap Steps</h3>
                        
                        {steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="step-card">
                                
                                <div className="step-header">
                                    <h4>Step {stepIndex + 1}</h4>
                                    {steps.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveStep(stepIndex)} className="btn-remove">
                                            Remove Step
                                        </button>
                                    )}
                                </div>

                                <div className="form-grid">
                                    <div className="input-group">
                                        <label>Step Title</label>
                                        <input
                                            type="text"
                                            value={step.title}
                                            onChange={(e) => handleStepChange(stepIndex, "title", e.target.value)}
                                            placeholder="e.g. Foundation & Academics"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Duration</label>
                                        <input
                                            type="text"
                                            value={step.duration}
                                            onChange={(e) => handleStepChange(stepIndex, "duration", e.target.value)}
                                            placeholder="e.g. 3-4 Years"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="input-group full-width" style={{ marginTop: '20px' }}>
                                    <label>Step Description</label>
                                    <textarea
                                        value={step.description}
                                        onChange={(e) => handleStepChange(stepIndex, "description", e.target.value)}
                                        placeholder="Explain what the student should focus on during this step..."
                                        rows="3"
                                        required
                                    />
                                </div>

                                {/* Dynamic Courses Section INSIDE the Step */}
                                <div className="courses-section">
                                    <label className="courses-label">Recommended Courses for this Step</label>
                                    
                                    {step.courses.map((course, courseIndex) => (
                                        <div key={courseIndex} className="course-input-row">
                                            <input
                                                type="text"
                                                value={course}
                                                onChange={(e) => handleCourseChange(stepIndex, courseIndex, e.target.value)}
                                                placeholder={`Course ${courseIndex + 1} (e.g. B.Tech Computer Science)`}
                                                required
                                            />
                                            {step.courses.length > 1 && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveCourse(stepIndex, courseIndex)}
                                                    className="btn-remove-course"
                                                    title="Remove this course"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    
                                    <button 
                                        type="button" 
                                        onClick={() => handleAddCourse(stepIndex)} 
                                        className="btn-add-course"
                                    >
                                        + Add Another Course
                                    </button>
                                </div>

                            </div>
                        ))}

                        <button type="button" onClick={handleAddStep} className="btn-add-step">
                            + Add New Step
                        </button>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Save Roadmap Updates'}
                    </button>

                    <button 
                        type="button" 
                        onClick={() => navigate("/admin/manage-roadmaps")} 
                        className="submit-btn" 
                        style={{marginTop: "10px", backgroundColor: "#6c757d"}}
                    >
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UpdateRoadmap;
