import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

/**
 * Decodes the payload of a JWT token without any external library.
 * Returns null if the token is invalid or missing.
 */
const decodeJwtPayload = (token) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    // Replace URL-safe chars and decode
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

/**
 * Performs the logout by clearing localStorage and redirecting.
 * Optionally shows a SweetAlert2 notification.
 * @param {boolean} showAlert - Whether to show the "session expired" alert
 */
const performLogout = async (showAlert = true) => {
  const token = localStorage.getItem('accessToken');

  // Best-effort call to backend to invalidate refresh token
  if (token) {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          // Short timeout so a dead server doesn't block the UI logout
          timeout: 4000,
        }
      );
    } catch {
      // Ignore – we always clear local state regardless
    }
  }

  localStorage.removeItem('accessToken');
  localStorage.removeItem('isLoggedIn');

  if (showAlert) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    await Swal.fire({
      icon: 'warning',
      title: 'Session Expired',
      text: 'Your session has expired. Please log in again.',
      background: isDarkMode ? '#1e1e1e' : '#ffffff',
      color: isDarkMode ? '#f1f1f1' : '#333333',
      confirmButtonColor: '#007bff',
      customClass: {
        popup: isDarkMode ? 'dark-mode-alert' : 'light-mode-alert',
      },
    });
  }

  // Full-page reload so the header state resets immediately
  window.location.href = '/login';
};

/**
 * useAutoLogout
 *
 * Attach this hook once at the App level. It will:
 *  1. Immediately check if the stored token is missing or already expired.
 *  2. Schedule a timer to logout exactly when the token expires.
 *  3. Register an Axios response interceptor to catch 401 errors app-wide.
 *  4. Listen for cross-tab storage events (another tab logs out → this tab follows).
 */
const useAutoLogout = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  // Track whether a logout is already in progress to prevent duplicate calls
  const isLoggingOutRef = useRef(false);

  useEffect(() => {
    const scheduleCheck = () => {
      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current);

      const token = localStorage.getItem('accessToken');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      // Not logged in → nothing to watch
      if (!isLoggedIn) return;

      // Logged in but token is missing
      if (!token) {
        if (!isLoggingOutRef.current) {
          isLoggingOutRef.current = true;
          performLogout(true);
        }
        return;
      }

      const payload = decodeJwtPayload(token);

      // Token is malformed
      if (!payload || !payload.exp) {
        if (!isLoggingOutRef.current) {
          isLoggingOutRef.current = true;
          performLogout(true);
        }
        return;
      }

      const expiresAt = payload.exp * 1000; // convert to ms
      const now = Date.now();
      const msUntilExpiry = expiresAt - now;

      // Token is already expired
      if (msUntilExpiry <= 0) {
        if (!isLoggingOutRef.current) {
          isLoggingOutRef.current = true;
          performLogout(true);
        }
        return;
      }

      // Schedule logout at exact expiry time
      timerRef.current = setTimeout(() => {
        if (!isLoggingOutRef.current) {
          isLoggingOutRef.current = true;
          performLogout(true);
        }
      }, msUntilExpiry);
    };

    scheduleCheck();

    // ── Axios interceptor: catch 401 Unauthorized from any API call ──
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 && !isLoggingOutRef.current) {
          isLoggingOutRef.current = true;
          performLogout(true);
        }
        return Promise.reject(error);
      }
    );

    // ── Cross-tab sync: another tab clears localStorage → logout here too ──
    const handleStorageChange = (event) => {
      if (
        (event.key === 'accessToken' || event.key === 'isLoggedIn') &&
        event.newValue === null &&
        !isLoggingOutRef.current
      ) {
        isLoggingOutRef.current = true;
        performLogout(false); // No alert – the other tab already showed one
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      axios.interceptors.response.eject(interceptorId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
};

export default useAutoLogout;
