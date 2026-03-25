import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { generateResponse } from './aiService';
import YamLogo from './YamLogo';
import './YamAiApp.css';

const ChatCore = ({ 
    title = "YAM AI", 
    subtitle = "Academic Mentor", 
    welcomeMessage = "Hello! I'm YAM, your Academic Mentor. How can I assist you today?",
    suggestions = [],
    context = "",
    isDedicatedPage = false,
    backRoute = "/yam-ai",
    customNav = null
}) => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('yam-theme') || 'dark-mode');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            role: 'assistant', 
            text: welcomeMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('yam-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark-mode' ? 'light-mode' : 'dark-mode');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

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
        
        const aiText = await generateResponse(context + textToSend, history);
        
        const aiMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            text: aiText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
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
                    {isDedicatedPage ? (
                        <button className="back-btn" onClick={() => navigate(backRoute)} title="Back">
                            <ArrowLeft size={20} />
                        </button>
                    ) : (
                        <YamLogo size={42} />
                    )}
                    <div className="yam-title-group">
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                </div>
                <div className="yam-header-actions">
                    <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                        {theme === 'dark-mode' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="stat-item">
                        <Sparkles size={16} />
                        <span>AI Active</span>
                    </div>
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
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
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
                        className={`send-btn ${input.trim() ? 'active' : ''}`}
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="suggestions">
                    {suggestions.map((suggestion, idx) => (
                        <button 
                            key={idx} 
                            className="suggestion-pill"
                            onClick={() => handleSend(suggestion)}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ChatCore;
