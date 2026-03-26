import React, { Suspense } from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Headers from './component/header';
import Footer from './component/footer';
import PageTransition from './component/PageTransition';
import SkeletonLoader from './component/SkeletonLoader';
import YamAiIcon from './component/YamAiIcon';

function App() {
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  // Scroll to top on every route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const isAiPage = ['/yam-ai', '/education-ai', '/career-ai'].includes(location.pathname);

  return (
    <div className="app-theme-provider">
      {!isAiPage && <Headers />}
      <div className={location.pathname === "/" || isAiPage ? "" : "navbar-spacing"}>
        <PageTransition key={location.pathname}>
          <Suspense fallback={<div style={{padding: '50px'}}><SkeletonLoader type="text" /></div>}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </div>
      {!isAiPage && <Footer />}
      <YamAiIcon />
    </div>
  );
}
export default App;