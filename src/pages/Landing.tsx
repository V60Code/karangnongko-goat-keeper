
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements that are already visible
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center flex items-center justify-center relative" 
               style={{ 
                 backgroundImage: "url('https://images.unsplash.com/photo-1593179357196-705229719426?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" 
               }}>
        <div className="absolute inset-0 bg-farm-dark bg-opacity-60"></div>
        <div className="text-center relative z-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            KarangnongkoFarm
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Digital Innovation for Local Goat Farming
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href="#about" className="bg-farm-gold text-white hover:bg-opacity-80 px-6 py-3 rounded-md font-medium text-lg inline-flex items-center">
              Learn More
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white" id="about">
        <div className="farm-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-farm-dark mb-4">Farm Statistics</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our digital management system helps us efficiently track and monitor our goat population across multiple barns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-on-scroll">
              <div className="text-5xl font-bold text-farm-primary mb-4">60</div>
              <div className="text-xl font-medium text-gray-700">Total Goats</div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-on-scroll">
              <div className="text-5xl font-bold text-farm-primary mb-4">20</div>
              <div className="text-xl font-medium text-gray-700">Western Barn (Kandang Barat)</div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-on-scroll">
              <div className="text-5xl font-bold text-farm-primary mb-4">40</div>
              <div className="text-xl font-medium text-gray-700">Eastern Barn (Kandang Timur)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-farm-bg" id="features">
        <div className="farm-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-farm-dark mb-4">Our Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              KarangnongkoFarm's digital platform provides comprehensive tools for efficient goat farming management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center animate-on-scroll">
              <div className="bg-farm-primary bg-opacity-10 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-farm-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-farm-dark">Goat Management</h3>
              <p className="text-gray-600 text-center">
                Track and manage your goat population with detailed information on age, weight, and health status.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center animate-on-scroll">
              <div className="bg-farm-primary bg-opacity-10 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-farm-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-farm-dark">Feeding Schedule</h3>
              <p className="text-gray-600 text-center">
                Maintain organized feeding logs with a user-friendly calendar interface for better daily management.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center animate-on-scroll">
              <div className="bg-farm-primary bg-opacity-10 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-farm-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-farm-dark">Data Analytics</h3>
              <p className="text-gray-600 text-center">
                Get insights into your farm's performance with real-time statistics and monitoring tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white" id="testimonials">
        <div className="farm-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-farm-dark mb-4">Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear what our farm handlers have to say about our digital management system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-farm-bg p-6 rounded-lg shadow-md animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-farm-primary text-white flex items-center justify-center font-bold text-xl">
                  B
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-lg">Barat Handler</div>
                  <div className="text-gray-600 text-sm">Western Barn</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This system has revolutionized how I manage the western barn. I can easily track goat health and feeding schedules, which has improved our overall productivity."
              </p>
            </div>
            
            <div className="bg-farm-bg p-6 rounded-lg shadow-md animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-farm-primary text-white flex items-center justify-center font-bold text-xl">
                  T
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-lg">Timur Handler</div>
                  <div className="text-gray-600 text-sm">Eastern Barn</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The digital feeding log makes it so much easier to coordinate between shifts. I can see what's been done and what needs attention immediately without any confusion."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-farm-primary" id="contact">
        <div className="farm-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-lg text-white text-opacity-80 max-w-3xl mx-auto">
              Interested in learning more about our farm or digital management system? Get in touch with us!
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-farm-dark">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-farm-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-700">Karangnongko, Klaten</p>
                      <p className="text-gray-700">Central Java, Indonesia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-farm-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-gray-700">info@karangnongkofarm.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-farm-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-gray-700">+62 123 4567 890</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-farm-dark">Login</h3>
                <p className="text-gray-600 mb-4">
                  Are you a farm handler or admin? Access the management system by logging in.
                </p>
                <Link to="/login" className="bg-farm-primary text-white hover:bg-opacity-80 px-6 py-3 rounded-md font-medium inline-block">
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-farm-dark text-white py-8">
        <div className="farm-container">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="font-bold text-xl mr-1">Karangnongko</span>
              <span className="text-farm-gold font-semibold text-xl">Farm</span>
            </div>
            <p className="text-white text-opacity-70">
              &copy; {new Date().getFullYear()} KarangnongkoFarm. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
