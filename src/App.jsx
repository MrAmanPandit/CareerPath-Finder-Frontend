import React from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Headers from './component/header';
import Footer from './component/footer';
import PageTransition from './component/PageTransition';

function App() {
  const location = useLocation();
  return (
    <>
      <Headers />
      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>
      <Footer />
    </>
  );
}
export default App;