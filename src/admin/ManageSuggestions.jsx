import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageFeedback.css";
import SkeletonLoader from "../component/SkeletonLoader";
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from "../utils/customAlert";

const ManageSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchSuggestions();
    }, []);

    const fetchSuggestions = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/contact/suggestions`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            setSuggestions(response.data.data || []);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            showErrorAlert("Failed to load suggestions.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await showConfirmDialog(
            "Delete Suggestion",
            "Are you sure you want to delete this suggestion?",
            "Yes, delete"
        );
        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/contact/suggestions/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            showSuccessAlert("Suggestion deleted.");
            fetchSuggestions();
        } catch (error) {
            showErrorAlert("Failed to delete suggestion.");
        }
    };

    return (
        <div className="manage-feedback-wrapper">
            <div className="manage-feedback-container">
                <header className="form-header">
                    <h2 style={{color:"var(--text-color)"}}>User Suggestions</h2>
                    <p>Listen to what your users have to say to improve the platform.</p>
                </header>

                {isLoading ? (
                    <SkeletonLoader type="table" />
                ) : suggestions.length === 0 ? (
                    <div className="empty-state">No suggestions yet!</div>
                ) : (
                    <table className="feedback-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestions.map((s) => (
                                <tr key={s._id}>
                                    <td><strong>{s.name}</strong></td>
                                    <td>
                                        <div>{s.email}</div>
                                    </td>
                                    <td className={expandedId === s._id ? "message-expanded" : "message-cell"}>
                                        {s.message}
                                    </td>
                                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn-view" onClick={() => setExpandedId(expandedId === s._id ? null : s._id)}>
                                            {expandedId === s._id ? "Hide" : "View"}
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageSuggestions;
