import { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackThankYou.css";

/**
 * Checks once on mount if the logged-in user has a pending thank-you
 * from the admin marking their suggestion/complaint as done.
 * Shows a warm, personal popup if yes.
 */
const FeedbackThankYou = () => {
    const [popup, setPopup] = useState(null); // { type: "suggestion"|"complaint", message: "..." }
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const checkThankYou = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            try {
                // Get the current user's email first
                const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const email = userRes.data?.data?.email;
                if (!email) return;

                // Check if admin has marked any of their feedback as done
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/contact/check-thank-you?email=${encodeURIComponent(email)}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (res.data?.data?.hasPending) {
                    setPopup({ 
                        type: res.data.data.type, 
                        message: res.data.data.message,
                        date: res.data.data.date 
                    });
                    // Small delay so page loads first, then popup slides in
                    setTimeout(() => setVisible(true), 2000); // 2s delay for a premium feel
                }
            } catch {
                // Silently fail — this is a non-critical enhancement
            }
        };

        // Demo Trigger Listener (kept for Admin testing, no logs)
        const handleDemo = (e) => {
            setPopup(e.detail || { type: "suggestion", message: "Wow, your suggestion was amazing! We've implemented the dark mode improvements you mentioned." });
            setVisible(true);
        };
        window.addEventListener("trigger-thankyou-demo", handleDemo);

        checkThankYou();
        return () => window.removeEventListener("trigger-thankyou-demo", handleDemo);
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setVisible(false);
            setClosing(false);
            setPopup(null);
        }, 400);
    };

    if (!popup || !visible) return null;

    const isSuggestion = popup.type === "suggestion";

    return (
        <div className={`thankyou-overlay ${closing ? "closing" : ""}`} onClick={handleClose}>
            <div
                className={`thankyou-card ${closing ? "closing" : ""}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Decorative top bar */}
                <div className={`thankyou-topbar ${isSuggestion ? "bar-suggestion" : "bar-complaint"}`} />

                <button className="thankyou-close" onClick={handleClose} aria-label="Close">✕</button>

                <div className="thankyou-icon">{isSuggestion ? "💡" : "🔧"}</div>

                <h2 className="thankyou-title">
                    {isSuggestion ? "We heard you!" : "We fixed it!"}
                </h2>

                <p className="thankyou-subtitle">
                    {isSuggestion
                        ? "Your suggestion was reviewed by our team and we've taken steps to act on it. Thoughtful feedback like yours is what keeps this platform growing."
                        : "The issue you raised has been looked into and addressed. We really appreciate you taking the time to let us know — it genuinely helps us do better."}
                </p>

                <div className="thankyou-quote">
                    <span className="quote-mark">"</span>
                    <em>{popup.message.length > 120 ? popup.message.slice(0, 120) + "…" : popup.message}</em>
                    <span className="quote-mark">"</span>
                </div>

                <p className="thankyou-sign">— The CareerPath Finder Team</p>

                <button className="thankyou-btn" onClick={handleClose}>
                    {isSuggestion ? "Glad to hear it!" : "Thanks for the update!"}
                </button>
            </div>
        </div>
    );
};

export default FeedbackThankYou;
