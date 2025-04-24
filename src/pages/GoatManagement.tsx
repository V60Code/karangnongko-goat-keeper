
import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { goatService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Goat, GoatFormData, GoatGender, GoatStatus, BarnType } from '../types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const GoatManagement: React.FC = () => {
  const { user } = useAuth();
  const [goats, setGoats] = useState<Goat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoat, setSelectedGoat] = useState<Goat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filterBarn, setFilterBarn] = useState<BarnType | 'all'>('all');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState<GoatFormData>({
    tag: '',
    weight: '',
    age: '',
    gender: 'male',
    status: 'healthy',
    barn: user?.role === 'admin' ? 'barat' : (user?.barn as BarnType) || 'barat'
  });

  const fetchGoats = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = filterBarn !== 'all' ? { barn: filterBarn } : {};
      const data = await goatService.getGoats(filters);
      setGoats(data);
    } catch (error) {
      console.error('Failed to fetch goats:', error);
      setError('Failed to load goats data');
      toast.error('Failed to load goats. Using demo data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoats();
  }, [filterBarn]);

  useEffect(() => {
    if (!isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (selectedGoat) {
      setFormData({
        tag: selectedGoat.tag,
        weight: selectedGoat.weight,
        age: selectedGoat.age,
        gender: selectedGoat.gender,
        status: selectedGoat.status,
        barn: selectedGoat.barn
      });
      setIsDialogOpen(true);
    }
  }, [selectedGoat]);

  const resetForm = () => {
    setFormData({
      tag: '',
      weight: '',
      age: '',
      gender: 'male',
      status: 'healthy',
      barn: user?.role === 'admin' ? 'barat' : (user?.barn as BarnType) || 'barat'
    });
    setSelectedGoat(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBarn(e.target.value as BarnType | 'all');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGoat = () => {
    setIsDialogOpen(true);
  };

  const handleEditGoat = (goat: Goat) => {
    setSelectedGoat(goat);
  };

  const handleDeleteConfirm = (goat: Goat) => {
    setSelectedGoat(goat);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      if (!formData.tag || formData.weight === '' || formData.age === '') {
        toast.error('Please fill all required fields');
        return;
      }
      
      const goatData = {
        ...formData,
        weight: Number(formData.weight),
        age: Number(formData.age)
      };
      
      if (selectedGoat) {
        // Update existing goat
        const updatedGoat = await goatService.updateGoat(selectedGoat.id, goatData);
        toast.success('Goat updated successfully');
        
        setGoats(goats.map(goat => 
          goat.id === selectedGoat.id ? { ...updatedGoat } : goat
        ));
      } else {
        // Create new goat
        const newGoat = await goatService.createGoat(goatData);
        toast.success('New goat added successfully');
        
        setGoats([...goats, newGoat]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to save goat:', error);
      toast.error('Failed to save goat data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedGoat) return;
    
    try {
      setIsDeleting(true);
      await goatService.deleteGoat(selectedGoat.id);
      toast.success('Goat deleted successfully');
      
      setGoats(goats.filter(goat => goat.id !== selectedGoat.id));
      setIsDeleteDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to delete goat:', error);
      toast.error('Failed to delete goat');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadgeClass = (status: GoatStatus) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'sick':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'dead':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  const canManageBarn = (barnName: string) => {
    if (user?.role === 'admin') return true;
    return user?.barn === barnName;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-farm-dark">Goat Management</h1>
          <p className="text-gray-600 mt-1">Manage your goats inventory</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <select
            value={filterBarn}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
          >
            <option value="all">All Barns</option>
            <option value="barat">Western Barn (Barat)</option>
            <option value="timur">Eastern Barn (Timur)</option>
          </select>
          
          <Button 
            onClick={handleAddGoat}
            className="bg-farm-primary hover:bg-opacity-90"
          >
            Add Goat
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : goats.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">No goats found</p>
          <p className="text-sm text-gray-500 mt-1">
            {filterBarn !== 'all' 
              ? `No goats found in the ${filterBarn === 'barat' ? 'Western' : 'Eastern'} barn.` 
              : 'Add your first goat to get started.'}
          </p>
          <Button
            onClick={handleAddGoat}
            className="mt-4 bg-farm-primary hover:bg-opacity-90"
          >
            Add Your First Goat
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tag ID</TableHead>
                  <TableHead>Weight (kg)</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Barn</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goats.map((goat) => (
                  <TableRow key={goat.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{goat.tag}</TableCell>
                    <TableCell>{goat.weight}</TableCell>
                    <TableCell>{goat.age}</TableCell>
                    <TableCell className="capitalize">{goat.gender}</TableCell>
                    <TableCell>
                      <span className={getStatusBadgeClass(goat.status)}>
                        {goat.status}
                      </span>
                    </TableCell>
                    <TableCell className="capitalize">
                      {goat.barn === 'barat' ? 'Western (Barat)' : 'Eastern (Timur)'}
                    </TableCell>
                    <TableCell className="text-right">
                      {canManageBarn(goat.barn) && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditGoat(goat)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(goat)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-farm-dark">
                {selectedGoat ? 'Edit Goat' : 'Add New Goat'}
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
                  <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                    Tag ID *
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg) *
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.1"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age (months) *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-farm-primary focus:border-farm-primary"
                    >
                      <option value="healthy">Healthy</option>
                      <option value="sick">Sick</option>
                      <option value="dead">Dead</option>
                    </select>
                  </div>
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
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : selectedGoat ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-farm-dark">Confirm Deletion</h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete goat with tag <span className="font-medium">{selectedGoat?.tag}</span>? This action cannot be undone.
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
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default GoatManagement;
