import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageUsers.css";
import "./ManageFeedback.css";
import SkeletonLoader from "../component/SkeletonLoader";
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from "../utils/customAlert";

const authHeaders = () => ({
    withCredentials: true,
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
});

const ManageSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => { fetchSuggestions(); }, []);

    const fetchSuggestions = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/contact/suggestions`,
                authHeaders()
            );
            setSuggestions(response.data.data || []);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            showErrorAlert("Failed to load suggestions.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleView = async (id) => {
        const isExpanding = expandedId !== id;
        setExpandedId(isExpanding ? id : null);
        if (isExpanding) {
            const s = suggestions.find(s => s._id === id);
            if (s && !s.isRead) {
                try {
                    await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/contact/suggestions/${id}/read`, {}, authHeaders());
                    setSuggestions(prev => prev.map(s => s._id === id ? { ...s, isRead: true } : s));
                } catch { /* non-critical */ }
            }
        }
    };

    const handleDone = async (id) => {
        const result = await showConfirmDialog(
            "Mark as Done?",
            "This will notify the user with a thank-you message the next time they visit the site.",
            "Yes, mark as done!"
        );
        if (!result.isConfirmed) return;
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/contact/suggestions/${id}/done`, {}, authHeaders());
            await showSuccessAlert("Suggestion marked as done! The user will be notified on their next visit.");
            setSuggestions(prev => prev.map(s => s._id === id ? { ...s, isDone: true, isRead: true } : s));
        } catch {
            showErrorAlert("Failed to mark suggestion as done.");
        }
    };

    const handleDelete = async (id) => {
        const result = await showConfirmDialog("Delete Suggestion", "Are you sure you want to delete this suggestion?", "Yes, delete");
        if (!result.isConfirmed) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/contact/suggestions/${id}`, authHeaders());
            showSuccessAlert("Suggestion deleted.");
            fetchSuggestions();
        } catch {
            showErrorAlert("Failed to delete suggestion.");
        }
    };

    const unreadCount = suggestions.filter(s => !s.isRead).length;
    const doneCount = suggestions.filter(s => s.isDone).length;

    return (
        <div className="manage-users-wrapper">
            <div className="manage-users-container" style={{ borderTopColor: "#f59e0b" }}>

                <header className="form-header">
                    <div className="feedback-header-row">
                        <h2 style={{ color: "var(--text-color)" }}>💡 User Suggestions</h2>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {unreadCount > 0 && (
                                <span className="feedback-unread-badge suggestions-unread">{unreadCount} unread</span>
                            )}
                            {doneCount > 0 && (
                                <span className="feedback-unread-badge" style={{ background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff" }}>
                                    {doneCount} resolved
                                </span>
                            )}
                        </div>
                    </div>
                    <p>Read what your users have to say and mark them done once you've acted on them.</p>
                </header>

                <div className="table-wrapper">
                    {isLoading ? (
                        <div className="loading-state"><SkeletonLoader type="table" /></div>
                    ) : suggestions.length === 0 ? (
                        <div className="empty-state">No suggestions yet — check back later!</div>
                    ) : (
                        <table className="users-table" style={{ minWidth: "820px" }}>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suggestions.map((s) => (
                                    <tr key={s._id} className={!s.isRead ? "row-unread" : ""}>
                                        <td>
                                            <div className="user-name">
                                                <div className="avatar-circle" style={{
                                                    background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
                                                    color: "#b45309"
                                                }}>
                                                    {s.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>
                                                    {s.name}
                                                    {!s.isRead && <span className="inline-unread-dot" title="Unread" style={{ marginLeft: "6px" }} />}
                                                </span>
                                            </div>
                                        </td>
                                        <td>{s.email}</td>
                                        <td
                                            className={expandedId === s._id ? "message-expanded" : "message-cell"}
                                            style={{ maxWidth: "260px", whiteSpace: expandedId === s._id ? "normal" : "nowrap" }}
                                        >
                                            {s.message}
                                        </td>
                                        <td style={{ whiteSpace: "nowrap" }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {s.isDone ? (
                                                <span className="role-badge" style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", color: "#065f46", border: "1px solid #6ee7b7" }}>
                                                    ✅ Resolved
                                                </span>
                                            ) : (
                                                <span className="role-badge badge-user">Pending</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="action-cells">
                                                <button className="btn-action btn-promote" onClick={() => handleToggleView(s._id)}>
                                                    {expandedId === s._id ? "Hide" : "View"}
                                                </button>
                                                {!s.isDone && (
                                                    <button
                                                        className="btn-action btn-done"
                                                        onClick={() => handleDone(s._id)}
                                                    >
                                                        Done
                                                    </button>
                                                )}
                                                <button className="btn-action btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="table-summary">
                    <div className="table-footer">
                        <p>Total Suggestions: <span>{suggestions.length}</span></p>
                    </div>
                    <div className="table-footer">
                        <p>Resolved: <span>{doneCount}</span></p>
                    </div>
                    <div className="table-footer">
                        <p>Pending: <span>{suggestions.length - doneCount}</span></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageSuggestions;
