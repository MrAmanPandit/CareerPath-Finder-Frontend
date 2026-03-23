import React, { Suspense } from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Headers from './component/header';
import Footer from './component/footer';
import PageTransition from './component/PageTransition';
import SkeletonLoader from './component/SkeletonLoader';

function App() {
  const location = useLocation();
  return (
    <>
      <Headers />
      <PageTransition key={location.pathname}>
        <Suspense fallback={<div style={{padding: '50px'}}><SkeletonLoader type="text" /></div>}>
          <Outlet />
        </Suspense>
      </PageTransition>
      <Footer />
    </>
  );
}
export default App;