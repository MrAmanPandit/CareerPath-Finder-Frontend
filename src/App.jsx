
import React from 'react';
import './App.css';
import {  Outlet } from 'react-router-dom';
import Headers from './component/header';
import Footer from './component/footer';

function App() {
  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  );
}
export default App;