
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { goatService } from '../services/api';
import { GoatStats } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<GoatStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch goat stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await goatService.getGoatStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch goat statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-farm-dark">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.username}! Here's an overview of your farm.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-farm-primary">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Goats</div>
            <div className="text-3xl font-bold text-farm-dark">{stats?.total || 0}</div>
            <div className="text-sm text-gray-500 mt-2">Across all barns</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-farm-gold">
            <div className="text-sm font-medium text-gray-500 mb-1">Western Barn (Kandang Barat)</div>
            <div className="text-3xl font-bold text-farm-dark">{stats?.barat || 0}</div>
            <div className="text-sm text-gray-500 mt-2">Healthy goats</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-500 mb-1">Eastern Barn (Kandang Timur)</div>
            <div className="text-3xl font-bold text-farm-dark">{stats?.timur || 0}</div>
            <div className="text-sm text-gray-500 mt-2">Healthy goats</div>
          </div>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-farm-dark mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center animate-pulse">
                  <div className="h-8 w-8 rounded-full bg-gray-200 mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-2">No recent activities found</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-farm-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="/goats" 
              className="bg-farm-bg p-4 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center text-center"
            >
              <svg className="w-8 h-8 text-farm-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-medium text-gray-700">Manage Goats</span>
            </a>
            
            <a 
              href="/feeding" 
              className="bg-farm-bg p-4 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center text-center"
            >
              <svg className="w-8 h-8 text-farm-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-700">Feeding Schedule</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
