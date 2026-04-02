import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';

const SaveCourseBtn = ({ courseName }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkSaved = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                const savedCourses = response.data.data.savedCourses || [];
                setIsSaved(savedCourses.includes(courseName));
            } catch (err) {
                console.error("Error checking saved status:", err);
            }
        };
        checkSaved();
    }, [courseName]);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const token = localStorage.getItem("accessToken");
        if (!token) {
            showErrorAlert("Please login to save courses");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/toggle-course`, 
                { courseName },
                { 
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true 
                }
            );
            const newList = response.data.data;
            setIsSaved(newList.includes(courseName));
            showSuccessAlert(newList.includes(courseName) ? "Course saved to dashboard!" : "Course removed from dashboard");
        } catch (err) {
            showErrorAlert("Failed to update saved courses");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            className={`save-course-action ${isSaved ? 'saved' : ''} ${loading ? 'loading' : ''}`}
            onClick={handleToggle}
            disabled={loading}
            title={isSaved ? "Remove from dashboard" : "Save to dashboard"}
        >
            {isSaved ? <BookmarkCheck size={18} fill="currentColor" /> : <Bookmark size={18} />}
        </button>
    );
};

export default SaveCourseBtn;
