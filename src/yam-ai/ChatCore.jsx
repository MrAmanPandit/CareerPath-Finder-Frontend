import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, Sparkles, Sun, Moon, ArrowLeft, Square } from 'lucide-react';
import { generateResponse } from './aiService';
import YamLogo from './YamLogo';
import './YamAiApp.css';

const ChatCore = ({ 
    title = "YAM AI", 
    subtitle = "Academic Mentor", 
    welcomeMessage = "Hello! I'm YAM, your Academic Mentor. How can I assist you today?",
    context = "",
    isDedicatedPage = false,
    backRoute = "/yam-ai",
    customNav = null
}) => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('yam-theme') || 'dark-mode');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [userName, setUserName] = useState('');
    const skipAnimationRef = useRef(false);
    const messagesEndRef = useRef(null);

    // Initial greeting after name is (potentially) fetched
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const userData = response.data.message;
                    if (userData) {
                        setUser(userData);
                        setUserName(userData.firstName || '');
                    }
                } catch (err) {
                    console.error("Failed to fetch user name:", err);
                }
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const greeting = userName ? `Hello ${userName}! I'm YAM, your Academic Mentor. How can I assist you today?` : welcomeMessage;
        setMessages([
            { 
                id: 1, 
                role: 'assistant', 
                text: greeting,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
    }, [userName, welcomeMessage]);

    useEffect(() => {
        localStorage.setItem('yam-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark-mode' ? 'light-mode' : 'dark-mode');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const prevMessagesLength = useRef(messages.length);

    useEffect(() => {
        // Only scroll to bottom when a NEW message is added to the list,
        // or when the user starts typing (initial indicator).
        // This prevents the 'drag down' effect during the word-by-word typing simulation.
        if (messages.length > prevMessagesLength.current || isTyping) {
            scrollToBottom();
        }
        prevMessagesLength.current = messages.length;
    }, [messages.length, isTyping]);

    const handleSend = async (customInput) => {
        const textToSend = customInput || input;
        if (!textToSend.trim() || isTyping) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            text: textToSend,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const history = messages.map(m => ({ role: m.role, text: m.text }));
        
        let aiText = await generateResponse(context + textToSend, history);
        
        if (aiText === "QUOTA_EXCEEDED") {
            aiText = "The AI is currently under high load and has reached its limit. Please try again in about a minute. We apologize for the inconvenience!";
        }
        
        const aiMessageId = Date.now() + 1;
        const aiMessage = {
            id: aiMessageId,
            role: 'assistant',
            text: '', // Start empty for typing effect
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isTyping: true
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Reset skip flag
        skipAnimationRef.current = false;

        // Simulate typing effect
        let currentText = '';
        const words = aiText.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (skipAnimationRef.current) {
                // If skip is requested, show full text and break
                setMessages(prev => prev.map(m => 
                    m.id === aiMessageId ? { ...m, text: aiText, isTyping: false } : m
                ));
                break;
            }

            currentText += words[i] + (i === words.length - 1 ? '' : ' ');
            setMessages(prev => prev.map(m => 
                m.id === aiMessageId ? { ...m, text: currentText } : m
            ));
            
            // FASTER TYING SPEED: 10-25ms
            await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 15));
        }

        setMessages(prev => prev.map(m => 
            m.id === aiMessageId ? { ...m, isTyping: false } : m
        ));
        setIsTyping(false);
        skipAnimationRef.current = false;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`yam-ai-wrapper ${theme}`}>
            <motion.header 
                className="yam-header"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="yam-header-content">
                    <button className="back-btn" onClick={() => navigate(backRoute)} title="Back">
                        <ArrowLeft size={24} />
                    </button>
                    <YamLogo size={64} />
                    <div className="yam-title-group">
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                </div>
                <div className="yam-header-actions">
                    <button className="profile-btn" onClick={() => navigate('/profile')} title="Go to Profile">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" className="profile-img" />
                        ) : (
                            <div className="profile-initial">
                                {userName ? userName[0].toUpperCase() : <User size={20} />}
                            </div>
                        )}
                    </button>
                </div>
            </motion.header>

            {customNav}

            <div className="yam-chat-container">
                <div className="messages-viewport">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                className={`message-row ${msg.role}`}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 260, 
                                    damping: 20,
                                    opacity: { duration: 0.2 }
                                }}
                            >
                                <div className="avatar">
                                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                                </div>
                                <div className="message-content">
                                    <div className="bubble">
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    </div>
                                    <span className="timestamp">{msg.timestamp}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <div className="message-row assistant">
                            <div className="avatar"><Bot size={18} /></div>
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    {/* If a message is still 'typesimulating' (isTyping flag on message), show skip button there too? 
                        No, the global isTyping is sufficient for the current generation. */}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <motion.div 
                className="yam-input-area"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="input-wrapper">
                    <textarea 
                        placeholder="Ask anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        rows={1}
                    />
                    <button 
                        className={`send-btn ${input.trim() || isTyping ? 'active' : ''} ${isTyping ? 'pausing' : ''}`}
                        onClick={isTyping ? () => skipAnimationRef.current = true : () => handleSend()}
                        disabled={!input.trim() && !isTyping}
                        title={isTyping ? "Skip Animation" : "Send Message"}
                    >
                        {isTyping ? <Square size={18} fill="currentColor" /> : <Send size={18} />}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ChatCore;
