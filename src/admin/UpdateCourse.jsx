import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from '../component/SkeletonLoader';
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
        privateCollegesFees: "",
        stream: "",
        years: []
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
                        eligibility: data.eligibility || "",
                        addmissionProcess: data.addmissionProcess || "",
                        governmentCollegesFees: data.governmentCollegesFees || data.avgFees || "",
                        privateCollegesFees: data.privateCollegesFees || data.avgFees || "",
                        stream: data.stream || "",
                        years: data.years || []
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

    // --- Dynamic Nested State Helpers ---
    const addYear = () => {
        const nextYearNumber = course.years.length + 1;
        setCourse(prev => ({
            ...prev,
            years: [...prev.years, { yearNumber: nextYearNumber, semesters: [] }]
        }));
    };

    const removeYear = (index) => {
        const newYears = course.years.filter((_, i) => i !== index);
        const indexedYears = newYears.map((y, i) => ({ ...y, yearNumber: i + 1 }));
        setCourse(prev => ({ ...prev, years: indexedYears }));
    };

    const addSemester = (yearIndex) => {
        const newYears = [...course.years];
        const nextSemNumber = newYears[yearIndex].semesters.length + 1;
        newYears[yearIndex].semesters.push({ semesterNumber: nextSemNumber, subjects: [] });
        setCourse(prev => ({ ...prev, years: newYears }));
    };

    const removeSemester = (yearIndex, semIndex) => {
        const newYears = [...course.years];
        newYears[yearIndex].semesters = newYears[yearIndex].semesters.filter((_, i) => i !== semIndex);
        newYears[yearIndex].semesters = newYears[yearIndex].semesters.map((s, i) => ({ ...s, semesterNumber: i + 1 }));
        setCourse(prev => ({ ...prev, years: newYears }));
    };

    const addSubject = (yearIndex, semIndex) => {
        const newYears = [...course.years];
        newYears[yearIndex].semesters[semIndex].subjects.push({ name: "" });
        setCourse(prev => ({ ...prev, years: newYears }));
    };

    const removeSubject = (yearIndex, semIndex, subIndex) => {
        const newYears = [...course.years];
        newYears[yearIndex].semesters[semIndex].subjects = newYears[yearIndex].semesters[semIndex].subjects.filter((_, i) => i !== subIndex);
        setCourse(prev => ({ ...prev, years: newYears }));
    };

    const handleSubjectChange = (yearIndex, semIndex, subIndex, value) => {
        const newYears = [...course.years];
        newYears[yearIndex].semesters[semIndex].subjects[subIndex].name = value;
        setCourse(prev => ({ ...prev, years: newYears }));
    };
    // ------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: "", type: "" });

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/courses/${id}`, {
                ...course,
                duration: Number(course.duration)
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            setMessage({ text: "Course updated successfully!", type: "success" });

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
        return <div style={{ textAlign: "center", padding: "50px" }}><SkeletonLoader type="form" /></div>;
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
                                <label>Stream / Branch</label>
                                <input
                                    type="text"
                                    name="stream"
                                    value={course.stream}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Engineering, Arts"
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
                        <h3 style={{ color: "var(--text-color)" }}>Curriculum Structure</h3>
                        <div className="years-container">
                            {course.years && course.years.map((year, yIdx) => (
                                <div key={yIdx} className="year-card">
                                    <div className="card-header">
                                        <h4>Year {year.yearNumber}</h4>
                                        <button type="button" onClick={() => removeYear(yIdx)} className="remove-btn">Remove Year</button>
                                    </div>

                                    <div className="semesters-container">
                                        {year.semesters && year.semesters.map((sem, sIdx) => (
                                            <div key={sIdx} className="semester-box">
                                                <div className="box-header">
                                                    <h5>Semester {sem.semesterNumber}</h5>
                                                    <button type="button" onClick={() => removeSemester(yIdx, sIdx)} className="remove-btn secondary">Remove Sem</button>
                                                </div>

                                                <div className="subjects-list">
                                                    {sem.subjects && sem.subjects.map((sub, subIdx) => (
                                                        <div key={subIdx} className="subject-input-row">
                                                            <input
                                                                type="text"
                                                                value={sub.name}
                                                                onChange={(e) => handleSubjectChange(yIdx, sIdx, subIdx, e.target.value)}
                                                                placeholder="Subject Name"
                                                                required
                                                            />
                                                            <button type="button" onClick={() => removeSubject(yIdx, sIdx, subIdx)} className="remove-sub-btn">&times;</button>
                                                        </div>
                                                    ))}
                                                    <button type="button" onClick={() => addSubject(yIdx, sIdx)} className="add-sub-btn">
                                                        + Add Subject
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addSemester(yIdx)} className="add-sem-btn">
                                            + Add Semester
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addYear} className="add-year-btn">
                                + Add Year to Curriculum
                            </button>
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
