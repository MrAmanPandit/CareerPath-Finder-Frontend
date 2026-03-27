import { useState } from "react";
import axios from "axios";
import "./AddRoadmap.css";

const AddRoadmap = () => {
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
            courses: [{ name: "", link: "" }] // Initializes with one blank course object
        }
    ]);

    // --- Handlers for Steps ---
    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        setSteps(updatedSteps);
    };

    const handleAddStep = () => {
        setSteps([
            ...steps, 
            { title: "", duration: "", description: "", courses: [{ name: "", link: "" }] }
        ]);
    };

    const handleRemoveStep = (indexToRemove) => {
        const updatedSteps = steps.filter((_, index) => index !== indexToRemove);
        setSteps(updatedSteps);
    };

    // --- Handlers for Nested Courses ---
    const handleCourseChange = (stepIndex, courseIndex, field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].courses[courseIndex][field] = value;
        setSteps(updatedSteps);
    };

    const handleAddCourse = (stepIndex) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].courses.push({ name: "", link: "" }); // Add a new blank object to this step's courses
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
            id: index + 1, // Automatically generates the required ID based on order
            title: step.title,
            duration: step.duration,
            description: step.description,
            // Filter out any blank course boxes the admin forgot to delete
            courses: step.courses.filter(course => course.name.trim() !== "") 
        }));

        try {
            // Send to your backend (adjust the URL if your roadmap route is different)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/admin/add-roadmap`, {
                jobTitle: jobTitle.trim(),
                steps: formattedSteps
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            setMessage({ text: "Roadmap added successfully!", type: "success" });
            
            // Reset the form
            setJobTitle("");
            setSteps([{ title: "", duration: "", description: "", courses: [{ name: "", link: "" }] }]);

        } catch (error) {
            console.error("Error adding roadmap:", error.response?.data?.message || error.message);
            setMessage({ 
                text: error.response?.data?.message || "Failed to add roadmap. Please try again.", 
                type: "error" 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-roadmap-wrapper">
            <div className="add-roadmap-container">
                
                <header className="form-header">
                    <h2 style={{color:"var(--text-color)"}}>Create Career Roadmap</h2>
                    <p>Build a step-by-step educational journey for a specific dream job.</p>
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
                                                value={course.name}
                                                onChange={(e) => handleCourseChange(stepIndex, courseIndex, "name", e.target.value)}
                                                placeholder={`Course Name ${courseIndex + 1} (e.g. B.Tech Computer Science)`}
                                                required
                                            />
                                            <input
                                                type="url"
                                                value={course.link}
                                                onChange={(e) => handleCourseChange(stepIndex, courseIndex, "link", e.target.value)}
                                                placeholder={`Course Link ${courseIndex + 1} (URL)`}
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
                        {isSubmitting ? 'Publishing...' : 'Publish Roadmap to Database'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddRoadmap;