
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-sidebar h-screen w-64 fixed left-0 top-0 overflow-y-auto shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="text-white text-lg font-semibold">
            <span className="font-bold">Karangnongko</span>
            <span className="text-farm-gold">Farm</span>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="bg-sidebar-accent rounded-lg p-4">
            <div className="text-sidebar-foreground font-medium mb-1">Welcome,</div>
            <div className="text-sidebar-foreground font-bold text-lg">{user?.username}</div>
            <div className="text-sidebar-foreground opacity-70 text-sm capitalize">Role: {user?.role}</div>
          </div>
        </div>
        
        <nav className="space-y-1">
          <NavLink 
            to="/dashboard"
            end
            className={({isActive}) => `
              flex items-center px-4 py-3 rounded-lg
              ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
            `}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/goats"
            className={({isActive}) => `
              flex items-center px-4 py-3 rounded-lg
              ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
            `}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Goat Management
          </NavLink>
          
          <NavLink 
            to="/feeding"
            className={({isActive}) => `
              flex items-center px-4 py-3 rounded-lg
              ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
            `}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Feeding Schedule
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
