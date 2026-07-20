import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Service, ServiceFormData } from '../types';

const parseSlot = (slotStr: string) => {
  const parts = (slotStr || '').split(':');
  
  if (parts.length >= 3) {
    const availableVal = parts[parts.length - 1] === 'true';
    const surgeVal = parseFloat(parts[parts.length - 2]);
    const isSurgeNumeric = !isNaN(surgeVal);
    
    if (isSurgeNumeric) {
      const timeVal = parts.slice(0, parts.length - 2).join(':');
      return {
        time: timeVal,
        surge: surgeVal,
        available: availableVal
      };
    }
  }

  if (parts.length === 2) {
    const surgeVal = parseFloat(parts[1]);
    const isSurgeNumeric = !isNaN(surgeVal);
    if (isSurgeNumeric) {
      return {
        time: parts[0],
        surge: surgeVal,
        available: true
      };
    }
  }

  return {
    time: slotStr || 'Unknown',
    surge: 0,
    available: true
  };
};

const initialFormData: ServiceFormData = {
  name: '',
  description: '',
  basePrice: 0,
  category: '',
  subcategory: '',
  isAvailable: true,
  isFastBooking: false,
  imageUrl: '',
  duration: 2,
  slots: [
    '08:00 AM:10:true',
    '08:30 AM:10:true',
    '09:00 AM:10:true',
    '09:30 AM:10:true',
    '10:00 AM:10:true',
    '10:30 AM:10:true',
    '11:00 AM:10:true',
    '11:30 AM:10:true',
    '12:00 PM:10:true',
    '12:30 PM:0:true',
    '01:00 PM:0:true',
    '01:30 PM:0:true',
    '02:00 PM:0:true',
    '02:30 PM:0:true',
    '03:00 PM:0:true',
    '03:30 PM:0:true',
    '04:00 PM:0:true',
    '04:30 PM:0:true',
    '05:00 PM:0:true',
    '05:30 PM:0:true',
    '06:00 PM:0:true',
    '06:30 PM:0:true',
    '07:00 PM:0:false',
    '07:30 PM:0:true',
    '08:00 PM:0:false',
    '08:30 PM:0:false'
  ],
};

const categories = ['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Carpentry', 'Gardening', 'Moving', 'Other'];

const timeOptions = [
  '05:00 AM', '05:30 AM',
  '06:00 AM', '06:30 AM',
  '07:00 AM', '07:30 AM',
  '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM',
  '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM',
  '09:00 PM', '09:30 PM',
  '10:00 PM', '10:30 PM'
];

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await apiService.getServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load services:', err);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name || '',
        description: service.description || '',
        basePrice: Number(service.basePrice) || 0,
        category: service.category || '',
        subcategory: service.subcategory || '',
        isAvailable: service.isAvailable,
        isFastBooking: service.isFastBooking,
        imageUrl: service.imageUrl || '',
        duration: Number(service.duration) || 2,
        slots: Array.isArray(service.slots) ? service.slots : ['morning', 'afternoon', 'evening'],
      });
    } else {
      setEditingService(null);
      setFormData(initialFormData);
    }
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingService) {
        await apiService.updateService(editingService.publicId, formData);
        setSuccess('Service updated successfully');
      } else {
        await apiService.createService(formData);
        setSuccess('Service created successfully');
      }
      handleCloseModal();
      await loadServices();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDelete = async (service: Service) => {
    if (!confirm(`Are you sure you want to delete "${service.name}"?`)) return;

    try {
      await apiService.deleteService(service.publicId);
      setSuccess('Service deleted successfully');
      await loadServices();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete service');
    }
  };

  const handleToggleAvailability = async (service: Service) => {
    try {
      await apiService.updateService(service.publicId, { isAvailable: !service.isAvailable });
      await loadServices();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update service');
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Service
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slots</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No services found
                </td>
              </tr>
            ) : (
              filteredServices.map((service) => (
                <tr key={service.publicId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    {service.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">{service.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {service.category || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{Number(service.basePrice).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.duration || 2}h
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[300px]">
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                      {(service.slots || []).map((slot, idx) => {
                        const parsed = parseSlot(slot);
                        return (
                          <span key={idx} className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                            parsed.available 
                              ? 'bg-green-50 text-green-700 border border-green-200' 
                              : 'bg-gray-100 text-gray-400 line-through'
                          }`}>
                            {parsed.time} {parsed.surge > 0 && `(₹${parsed.surge})`}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleAvailability(service)}
                      className={`px-2 py-1 text-xs font-medium rounded-full cursor-pointer ${
                        service.isAvailable
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {service.isAvailable ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingService ? 'Edit Service' : 'Add Service'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 2 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slots Configuration</label>
                  <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
                    {formData.slots.map((slot, index) => {
                      const parsed = parseSlot(slot);
                      return (
                        <div key={index} className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border border-gray-100">
                          <select
                            value={parsed.time}
                            onChange={(e) => {
                              const newSlots = [...formData.slots];
                              newSlots[index] = `${e.target.value}:${parsed.surge}:${parsed.available}`;
                              setFormData({ ...formData, slots: newSlots });
                            }}
                            className="flex-1 min-w-0 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          >
                            {(timeOptions.includes(parsed.time) ? timeOptions : [parsed.time, ...timeOptions]).map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">₹</span>
                            <input
                              type="number"
                              required
                              min="0"
                              placeholder="Surge"
                              value={parsed.surge}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                const newSlots = [...formData.slots];
                                newSlots[index] = `${parsed.time}:${val}:${parsed.available}`;
                                setFormData({ ...formData, slots: newSlots });
                              }}
                              className="w-16 px-1 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={parsed.available}
                              onChange={(e) => {
                                const newSlots = [...formData.slots];
                                newSlots[index] = `${parsed.time}:${parsed.surge}:${e.target.checked}`;
                                setFormData({ ...formData, slots: newSlots });
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">Active</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const newSlots = formData.slots.filter((_, i) => i !== index);
                              setFormData({ ...formData, slots: newSlots });
                            }}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            title="Remove Slot"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                    {formData.slots.length === 0 && (
                      <div className="text-xs text-gray-500 text-center py-4">No slots configured. Click "+ Add Time Slot" below.</div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSlots = [...formData.slots, '08:00 AM:0:true'];
                      setFormData({ ...formData, slots: newSlots });
                    }}
                    className="mt-2 w-full px-3 py-1.5 border border-dashed border-gray-300 text-blue-600 hover:bg-blue-50 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    + Add Time Slot
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFastBooking}
                    onChange={(e) => setFormData({ ...formData, isFastBooking: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Fast Booking</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
