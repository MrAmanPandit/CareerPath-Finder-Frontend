import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'text' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'profile':
        return (
          <div className="skeleton-profile-container">
            <div className="skeleton skeleton-avatar"></div>
            <div className="skeleton skeleton-title w-50"></div>
            <div className="skeleton skeleton-text w-30"></div>
            <div className="skeleton-detail-grid">
               <div className="skeleton skeleton-box"></div>
               <div className="skeleton skeleton-box"></div>
               <div className="skeleton skeleton-box"></div>
            </div>
          </div>
        );
      case 'form':
        return (
          <div className="skeleton-form-container">
            <div className="skeleton skeleton-title w-40"></div>
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-input"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        );
      case 'table':
        return (
          <div className="skeleton-table-container">
            <div className="skeleton-table-header">
              <div className="skeleton skeleton-col"></div>
              <div className="skeleton skeleton-col"></div>
              <div className="skeleton skeleton-col"></div>
            </div>
            <div className="skeleton-table-row"><div className="skeleton skeleton-full"></div></div>
            <div className="skeleton-table-row"><div className="skeleton skeleton-full"></div></div>
            <div className="skeleton-table-row"><div className="skeleton skeleton-full"></div></div>
            <div className="skeleton-table-row"><div className="skeleton skeleton-full"></div></div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="skeleton-dashboard-container">
            <div className="skeleton-stats-row">
              <div className="skeleton skeleton-stat"></div>
              <div className="skeleton skeleton-stat"></div>
              <div className="skeleton skeleton-stat"></div>
              <div className="skeleton skeleton-stat"></div>
            </div>
            <div className="skeleton skeleton-chart"></div>
          </div>
        );
      case 'search':
        return (
          <div className="skeleton-search-container">
             <div className="skeleton skeleton-search-bar"></div>
             <div className="skeleton-search-results">
               <div className="skeleton skeleton-result-card"></div>
               <div className="skeleton skeleton-result-card"></div>
               <div className="skeleton skeleton-result-card"></div>
             </div>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="skeleton-text-container">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text w-80"></div>
          </div>
        );
    }
  };

  return (
    <div className="skeleton-wrapper">
      {renderSkeleton()}
    </div>
  );
};

export default SkeletonLoader;
