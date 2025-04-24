
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isAuthenticated ? 'navbar-scrolled' : 'bg-transparent'
    }`}>
      <div className="farm-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white">
              <span className="font-bold text-xl mr-1">Karangnongko</span>
              <span className="text-farm-gold font-semibold text-xl">Farm</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {!isAuthenticated ? (
                // Public navigation items
                <>
                  <Link to="/" className="text-white hover:bg-farm-dark px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  <a href="#about" className="text-white hover:bg-farm-dark px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </a>
                  <a href="#features" className="text-white hover:bg-farm-dark px-3 py-2 rounded-md text-sm font-medium">
                    Features
                  </a>
                  <a href="#testimonials" className="text-white hover:bg-farm-dark px-3 py-2 rounded-md text-sm font-medium">
                    Testimonials
                  </a>
                  <a href="#contact" className="text-white hover:bg-farm-dark px-3 py-2 rounded-md text-sm font-medium">
                    Contact
                  </a>
                  <Link to="/login" className="bg-farm-gold text-white hover:bg-opacity-80 px-4 py-2 rounded-md text-sm font-medium ml-2">
                    Login
                  </Link>
                </>
              ) : (
                // Authenticated navigation items
                <>
                  <Link to="/dashboard" className="text-white hover:bg-farm-dark px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-farm-gold text-white hover:bg-opacity-80 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-farm-dark focus:outline-none"
            >
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64' : 'max-h-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-farm-primary bg-opacity-95 sm:px-3">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="text-white hover:bg-farm-dark block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <a href="#about" className="text-white hover:bg-farm-dark block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <a href="#features" className="text-white hover:bg-farm-dark block px-3 py-2 rounded-md text-base font-medium">
                Features
              </a>
              <a href="#testimonials" className="text-white hover:bg-farm-dark block px-3 py-2 rounded-md text-base font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-white hover:bg-farm-dark block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              <Link to="/login" className="bg-farm-gold text-white hover:bg-opacity-80 block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white hover:bg-farm-dark block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-farm-gold text-white hover:bg-opacity-80 w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
