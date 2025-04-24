
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { feedingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FeedingLog, FeedingLogFormData, BarnType } from '../types';

const FeedingSchedule: React.FC = () => {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [feedingLogs, setFeedingLogs] = useState<FeedingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLog, setSelectedLog] = useState<FeedingLog | null>(null);
  const [formData, setFormData] = useState<FeedingLogFormData>({
    date: format(new Date(), 'yyyy-MM-dd'),
    feed_time: '',
    barn: user?.role === 'admin' ? 'barat' : (user?.role as BarnType) || 'barat',
    note: ''
  });

  // Generate days for the calendar
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Fetch feeding logs for the current month
  useEffect(() => {
    const fetchFeedingLogs = async () => {
      try {
        setLoading(true);
        const year = format(currentMonth, 'yyyy');
        const month = format(currentMonth, 'MM');
        const data = await feedingService.getFeedingLogs({ year, month });
        setFeedingLogs(data);
      } catch (error) {
        console.error('Failed to fetch feeding logs:', error);
        toast.error('Failed to load feeding schedule data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedingLogs();
  }, [currentMonth]);

  // Reset form when dialog is closed
  useEffect(() => {
    if (!isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  // Set form data when editing a log
  useEffect(() => {
    if (selectedLog) {
      setFormData({
        date: selectedLog.date,
        feed_time: selectedLog.feed_time,
        barn: selectedLog.barn,
        note: selectedLog.note
      });
      setIsDialogOpen(true);
    }
  }, [selectedLog]);

  const resetForm = () => {
    setFormData({
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      feed_time: '',
      barn: user?.role === 'admin' ? 'barat' : (user?.role as BarnType) || 'barat',
      note: ''
    });
    setSelectedLog(null);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setFormData((prev) => ({ ...prev, date: format(day, 'yyyy-MM-dd') }));
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditLog = (log: FeedingLog) => {
    setSelectedLog(log);
  };

  const handleDeleteConfirm = (log: FeedingLog) => {
    setSelectedLog(log);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!formData.date || !formData.feed_time) {
        toast.error('Please fill all required fields');
        return;
      }
      
      const logData = {
        ...formData
      };
      
      if (selectedLog) {
        // Update existing log
        await feedingService.updateFeedingLog(selectedLog.id, logData);
        toast.success('Feeding log updated successfully');
        
        // Update local state
        setFeedingLogs(logs => 
          logs.map(log => log.id === selectedLog.id ? { ...log, ...logData, user_id: log.user_id } : log)
        );
      } else {
        // Create new log
        const newLog = await feedingService.createFeedingLog(logData);
        toast.success('Feeding log added successfully');
        
        // Update local state
        setFeedingLogs([...feedingLogs, newLog]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to save feeding log:', error);
      toast.error('Failed to save feeding log');
    }
  };

  const handleDelete = async () => {
    if (!selectedLog) return;
    
    try {
      await feedingService.deleteFeedingLog(selectedLog.id);
      toast.success('Feeding log deleted successfully');
      
      // Update local state
      setFeedingLogs(logs => logs.filter(log => log.id !== selectedLog.id));
      setIsDeleteDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to delete feeding log:', error);
      toast.error('Failed to delete feeding log');
    }
  };

  // Check if a day has any feeding logs
  const getDayLogs = (day: Date) => {
    return feedingLogs.filter(log => {
      const logDate = new Date(log.date);
      return isSameDay(logDate, day);
    });
  };

  // Determine if user can manage this barn
  const canManageBarn = (barnName: string) => {
    if (user?.role === 'admin') return true;
    return user?.role === barnName;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-farm-dark">Feeding Schedule</h1>
          <p className="text-gray-600 mt-1">Manage your daily feeding activities</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button
            onClick={prevMonth}
            variant="outline"
            className="px-3"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="text-lg font-medium text-farm-dark px-2 flex items-center">
            {format(currentMonth, 'MMMM yyyy')}
          </div>
          <Button
            onClick={nextMonth}
            variant="outline"
            className="px-3"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {Array(7).fill(0).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array(35).fill(0).map((_, i) => (
              <div key={i} className="aspect-square h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Calendar header (days of week) */}
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-700 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, i) => {
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const dayLogs = getDayLogs(day);
              const hasFeedingLog = dayLogs.length > 0;
              
              return (
                <div 
                  key={i}
                  className={`border-r border-b last:border-r-0 min-h-[8rem] p-1 ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div 
                    className={`cursor-pointer rounded-lg h-full p-2 transition-colors ${
                      isToday
                        ? 'bg-farm-primary text-white'
                        : hasFeedingLog
                        ? 'bg-farm-gold bg-opacity-20 hover:bg-opacity-30'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className={`text-right mb-1 ${isToday ? 'text-white' : 'text-gray-700'}`}>
                      {format(day, 'd')}
                    </div>
                    
                    {hasFeedingLog && (
                      <div className="space-y-1 mt-2">
                        {dayLogs.map(log => (
                          <div 
                            key={log.id}
                            className={`text-xs p-1 rounded ${
                              log.barn === 'barat'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (canManageBarn(log.barn)) {
                                handleEditLog(log);
                              }
                            }}
                          >
                            <div className="font-medium">{log.feed_time} - {log.barn === 'barat' ? 'West' : 'East'}</div>
                            {log.note && <div className="truncate">{log.note}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Feeding Log Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-farm-dark">
                {selectedLog ? 'Edit Feeding Log' : 'Add Feeding Log'}
              </h3>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="feed_time" className="block text-sm font-medium text-gray-700 mb-1">
                    Feeding Time *
                  </label>
                  <input
                    type="time"
                    id="feed_time"
                    name="feed_time"
                    value={formData.feed_time}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="barn" className="block text-sm font-medium text-gray-700 mb-1">
                    Barn *
                  </label>
                  <select
                    id="barn"
                    name="barn"
                    value={formData.barn}
                    onChange={handleInputChange}
                    required
                    disabled={user?.role !== 'admin'}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary ${
                      user?.role !== 'admin' ? 'bg-gray-100' : ''
                    }`}
                  >
                    <option value="barat">Western Barn (Barat)</option>
                    <option value="timur">Eastern Barn (Timur)</option>
                  </select>
                  {user?.role !== 'admin' && (
                    <p className="text-xs text-gray-500 mt-1">Only admin can change the barn</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    value={formData.note}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                    placeholder="Enter any relevant notes about the feeding..."
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <div>
                  {selectedLog && canManageBarn(selectedLog.barn) && (
                    <Button 
                      type="button"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setIsDeleteDialogOpen(true);
                      }}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-farm-primary hover:bg-opacity-90"
                  >
                    {selectedLog ? 'Update' : 'Add'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-farm-dark">Confirm Deletion</h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this feeding log? This action cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default FeedingSchedule;
