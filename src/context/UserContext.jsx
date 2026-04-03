import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

/**
 * UserProvider — wraps the entire app.
 * Fetches /current-user ONCE and shares the result with all components.
 * Eliminates duplicate API calls from Header + StudentDashboard + others.
 */
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("isLoggedIn") === "true"
    );

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("accessToken");
        if (!token && localStorage.getItem("isLoggedIn") !== "true") {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/users/current-user`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );
            setUser(response.data.data);
            setIsLoggedIn(true);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load profile");
            setUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("accessToken");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = (userData, token) => {
        if (token) localStorage.setItem("accessToken", token);
        localStorage.setItem("isLoggedIn", "true");
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsLoggedIn(false);
    };

    // Allows any component to refresh user data (e.g., after edit profile)
    const refreshUser = () => fetchUser();

    return (
        <UserContext.Provider value={{ user, loading, error, isLoggedIn, login, logout, refreshUser, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
