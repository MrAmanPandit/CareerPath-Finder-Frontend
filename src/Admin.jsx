import React from 'react';
import './App.css';
import {  Outlet } from 'react-router-dom';
import Headers from './component/header';
import Footer from './component/footer';
import AdminDashboard from './admin/AdminDashboard';

function Admin() {
  return (
    <>
      <Headers />
      <AdminDashboard/>
      <Outlet />
      <Footer />
    </>
  );
}
export default Admin;