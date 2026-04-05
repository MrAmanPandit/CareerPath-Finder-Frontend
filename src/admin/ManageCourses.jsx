import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageCourses.css";
import SkeletonLoader from "../component/SkeletonLoader";
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from "../utils/customAlert";

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [userRole, setUserRole] = useState("user");

    // Fetch all courses when the page loads
    useEffect(() => {
        fetchUserInfo();
        fetchCourses();
    }, []);

    // Filter courses locally when search term changes
    useEffect(() => {
        const results = courses.filter(course =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.stream.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(results);
    }, [searchTerm, courses]);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            setUserRole(response.data.data.role);
        } catch (error) {
            console.error("Error fetching user role", error);
        }
    };

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/courses`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            setCourses(response.data.data || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setMessage({ text: "Failed to load courses from the database.", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (courseId, courseName) => {
        const result = await showConfirmDialog(
            "Delete Course",
            `WARNING: Are you sure you want to permanently delete "${courseName}"?`,
            "Yes, delete course!"
        );
        if (!result.isConfirmed) return;

        try {
            // Adjust URL to match your backend delete route
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/admin/courses/${courseId}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            setMessage({ text: "", type: "" });
            await showSuccessAlert("Course successfully deleted.");
            fetchCourses(); // Refresh the list so the deleted course disappears
        } catch (error) {
            showErrorAlert(error.response?.data?.message || "Failed to delete course.");
        }
    };

    return (
        <div className="manage-courses-wrapper">
            <div className="manage-courses-container">

                <header className="form-header">
                    <div className="header-text">
                        <h2 style={{color:"var(--text)"}}>Manage Course Directory</h2>
                        <p>View all published educational programs or remove outdated ones from the database.</p>
                    </div>
                    <div className="header-actions">
                        <div className="search-bar">
                            <input 
                                type="text" 
                                placeholder="Search courses by name or stream..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="table-search-input"
                            />
                        </div>
                    </div>
                </header>

                {message.text && (
                    <div className={`status-banner ${message.type === 'success' ? 'banner-success' : 'banner-error'}`}>
                        {message.text}
                    </div>
                )}

                <div className="table-wrapper">
                    {isLoading ? (
                        <div className="loading-state"><SkeletonLoader type="table" /></div>
                    ) : (
                        <table className="courses-table">
                            <thead>
                                <tr>
                                    <th>Course Title</th>
                                    <th>Duration</th>
                                    <th>Avg. Govt Fees</th>
                                    <th>Avg. Private Fees</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course) => (
                                        <tr key={course._id}>
                                            <td>
                                                <div className="course-name-cell">
                                                    <div className="course-icon">📚</div>
                                                    <div className="course-info">
                                                        <span className="text-dark">
                                                            {course.name || course.title}
                                                        </span>
                                                        <span style={{display: 'block', fontSize: '11px', opacity: 0.7, color: 'var(--text)'}}>
                                                            {course.stream}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="data-feild">{course.duration} Yrs</td>
                                            <td className="data-feild">{course.governmentCollegesFees || course.avgFees || "N/A"}</td>
                                            <td className="data-feild">{course.privateCollegesFees || course.avgFees || "N/A"}</td>
                                            <td>
                                                <div className="action-cells">
                                                    {userRole === 'admin' && (
                                                        <button
                                                            className="btn-action btn-delete"
                                                            onClick={() => handleDelete(course._id, course.name || course.title)}
                                                        >Delete</button>
                                                    )}
                                                    <button
                                                        className="btn-action btn-update"
                                                        onClick={() => window.location.href = `/admin/update-course/${course._id}`}
                                                    >Update</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            {searchTerm ? `No courses found matching "${searchTerm}"` : "No courses available in the database."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                    

                    {!isLoading && courses.length === 0 && (
                        <div className="empty-state">No courses found in the database.</div>
                    )}
                </div>
                <div className="table-summary" >

                        <div className="table-footer">
                            <p>Total Courses: {courses.length}</p>
                        </div>

                        <div className="add-user-btn">
                          <Link to="/admin/add-course">  <button className="btn-action btn-add" style={{ float: 'right',border:"1px solid #169f56ff",borderRadius:"5px",padding:"5px 10px",backgroundColor:"#e8f9ecff",color:"#000000ff" }}>Add Course</button></Link>
                        </div>

                    </div>

            </div>
        </div>
    );
};

export default ManageCourses;