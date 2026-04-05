import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'text' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'profile':
        return (
          <div className="skeleton-profile-container">
            <div className="skeleton skeleton-avatar"></div>
            <div className="skeleton skeleton-title w-50" style={{ marginTop: '10px' }}></div>
            <div className="skeleton skeleton-text w-30"></div>
            <div className="skeleton-detail-flex">
              <div className="skeleton-card-mock">
                <div className="skeleton skeleton-text w-40"></div>
                <div className="skeleton skeleton-text w-80" style={{ height: '24px' }}></div>
              </div>
              <div className="skeleton-card-mock">
                <div className="skeleton skeleton-text w-40"></div>
                <div className="skeleton skeleton-text w-60" style={{ height: '24px' }}></div>
              </div>
              <div className="skeleton-card-mock">
                <div className="skeleton skeleton-text w-30"></div>
                <div className="skeleton skeleton-text w-70" style={{ height: '24px' }}></div>
              </div>
            </div>
          </div>
        );
      case 'form':
        return (
          <div className="skeleton-form-container">
            <div className="skeleton skeleton-title w-40" style={{ alignSelf: 'center', marginBottom: '30px' }}></div>
            <div className="skeleton-input-group">
              <div className="skeleton skeleton-text w-30"></div>
              <div className="skeleton skeleton-input"></div>
            </div>
            <div className="skeleton-input-group">
              <div className="skeleton skeleton-text w-40"></div>
              <div className="skeleton skeleton-input"></div>
            </div>
            <div className="skeleton skeleton-button" style={{ marginTop: '20px' }}></div>
          </div>
        );
      case 'table':
        return (
          <div className="skeleton-table-container">
            <div className="skeleton-table-header">
              <div className="skeleton skeleton-text w-20"></div>
              <div className="skeleton skeleton-text w-20"></div>
              <div className="skeleton skeleton-text w-20"></div>
              <div className="skeleton skeleton-text w-20"></div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-table-row">
                <div className="skeleton skeleton-text w-100" style={{ height: '40px', borderRadius: '8px' }}></div>
              </div>
            ))}
          </div>
        );
      case 'dashboard':
        return (
          <div className="skeleton-dashboard-container">
            <div className="skeleton skeleton-title w-30"></div>
            <div className="skeleton-stats-row">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-card-mock">
                  <div className="skeleton skeleton-avatar" style={{ width: '40px', height: '40px', marginBottom: '15px' }}></div>
                  <div className="skeleton skeleton-text w-50"></div>
                  <div className="skeleton skeleton-title w-80" style={{ marginTop: '10px', marginBottom: '0' }}></div>
                </div>
              ))}
            </div>
            <div className="skeleton-chart-mock">
              <div className="skeleton skeleton-text w-20"></div>
              <div className="skeleton skeleton-chart-body"></div>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="skeleton-search-container">
            <div className="skeleton-search-header">
              <div className="skeleton skeleton-title w-40"></div>
              <div className="skeleton skeleton-search-bar"></div>
            </div>
            <div className="skeleton-search-results">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-result-card-mock">
                  <div className="skeleton skeleton-avatar" style={{ width: '50px', height: '50px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-title w-70" style={{ marginBottom: '10px', height: '20px' }}></div>
                    <div className="skeleton skeleton-text w-90"></div>
                    <div className="skeleton skeleton-text w-60"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="skeleton-text-container">
            <div className="skeleton skeleton-title w-60"></div>
            <div className="skeleton skeleton-text w-100"></div>
            <div className="skeleton skeleton-text w-100"></div>
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
