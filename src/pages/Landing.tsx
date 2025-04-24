
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing: React.FC = () => {
  // Add a dummy function for onMenuClick since this is a public page
  const handleMenuClick = () => {
    // This is just a placeholder since we don't need mobile menu functionality on the landing page
  };

  return (
    <div className="min-h-screen bg-farm-bg">
      <Navbar onMenuClick={handleMenuClick} />
      
      <div className="pt-16 pb-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16 md:py-20 lg:py-24">
            <h1 className="text-4xl font-extrabold text-farm-dark md:text-5xl lg:text-6xl">
              Welcome to <span className="text-farm-primary">Karangnongko</span>
              <span className="text-farm-gold">Farm</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A modern livestock management system for goat farming
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-farm-primary hover:bg-opacity-90"
              >
                Login to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
