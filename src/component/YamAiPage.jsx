import React, { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import './YamAiPage.css';

const YamAiApp = lazy(() => import('../yam-ai/YamAiApp'));

const YamAiPage = () => {
    const location = useLocation();
    
    // Determine the initial section based on the route
    let initialSection = 'chat';
    if (location.pathname === '/education-ai') initialSection = 'education';
    if (location.pathname === '/career-ai') initialSection = 'careers';

    return (
        <div className="yam-page-container">
            <Suspense fallback={
                <div className="loading-page-container">
                    <div className="yam-loading-spinner"></div>
                    <h2>Initializing Intelligence Core...</h2>
                    <p>Connecting to YAM Neural Network</p>
                </div>
            }>
                <YamAiApp initialSection={initialSection} isDedicatedPage={initialSection !== 'chat'} />
            </Suspense>
        </div>
    );
};

export default YamAiPage;
