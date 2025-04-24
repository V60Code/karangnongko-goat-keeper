
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-farm-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-farm-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-farm-dark mb-2">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-farm-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-primary"
          >
            Return to Home
          </Link>
        </div>
        <div className="mt-12">
          <div className="flex items-center justify-center mb-4">
            <span className="font-bold text-xl mr-1">Karangnongko</span>
            <span className="text-farm-gold font-semibold text-xl">Farm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
