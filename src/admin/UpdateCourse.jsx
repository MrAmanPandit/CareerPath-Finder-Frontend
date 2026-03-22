import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddCourse.css";

const UpdateCourse = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
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

    // Fetch existing course data
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/courses/${id}`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });

                if (response.data && response.data.data) {
                    const data = response.data.data;
                    setCourse({
                        name: data.name || data.title || "",
                        duration: data.duration || "",
                        description: data.description || "",
                        // These fields might not be fully filled previously, so default to empty string
                        eligibility: data.eligibility || "",
                        addmissionProcess: data.addmissionProcess || "",
                        governmentCollegesFees: data.governmentCollegesFees || data.avgFees || "",
                        privateCollegesFees: data.privateCollegesFees || data.avgFees || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                setMessage({ text: "Failed to load course details.", type: "error" });
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);

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
            // Send a PUT request for updating
            await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/courses/${id}`, {
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

            setMessage({ text: "Course updated successfully!", type: "success" });

            // Wait slightly so they see the success message
            setTimeout(() => {
                navigate("/admin/manage-courses");
            }, 1000);

        } catch (error) {
            console.error("Error updating course:", error.response?.data?.message || error.message);
            setMessage({
                text: error.response?.data?.message || "Failed to update course. Please try again.",
                type: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "50px" }}>Loading course details...</div>;
    }

    return (
        <div className="add-course-wrapper">
            <div className="add-course-container">

                <header className="form-header">
                    <h2 style={{ color: "var(--text-color)" }}>Update Course details</h2>
                    <p>Modify the information below to update this course in the database.</p>
                </header>

                {message.text && (
                    <div className={`status-banner ${message.type === 'success' ? 'banner-success' : 'banner-error'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="course-form">

                    <div className="form-section">
                        <h3 style={{ color: "var(--text-color)" }}>General Information</h3>
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
                        <h3 style={{ color: "var(--text-color)" }}>Requirements & Process</h3>
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
                        <h3 style={{ color: "var(--text-color)" }}>Fee Structure Estimates</h3>
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

                    <button type="submit" className="submit-course-btn" style={{ marginBottom: "10px" }} disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Save Course Updates'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/manage-courses")}
                        className="submit-course-btn"
                        style={{ backgroundColor: "#6c757d" }}
                    >
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UpdateCourse;
