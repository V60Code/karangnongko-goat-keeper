
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  
  return (
    <header className="fixed top-0 w-full bg-white shadow z-40 h-16">
      <div className="px-6 h-full flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button 
            className="mr-4 text-gray-600 md:hidden"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* App logo/name */}
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-farm-primary">Karangnongko</span>
            <span className="text-xl font-bold text-farm-gold">Farm</span>
          </Link>
        </div>
        
        <div className="flex items-center">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">{user?.username || ''}</div>
            <div className="text-xs text-gray-500 capitalize">
              {user?.role === 'admin' ? 'Administrator' : `${user?.barn || ''} Handler`}
            </div>
          </div>
          
          <div className="ml-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
            {user?.username?.charAt(0).toUpperCase() || '?'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
