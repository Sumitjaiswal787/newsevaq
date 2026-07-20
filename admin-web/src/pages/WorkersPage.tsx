import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Worker } from '../types';

// Helper to get worker name from nested user object
const getWorkerName = (worker: Worker) => {
  const firstName = worker.user?.firstName || worker.firstName || '';
  const lastName = worker.user?.lastName || worker.lastName || '';
  return { firstName, lastName };
};

// Helper to get worker email from nested user object
const getWorkerEmail = (worker: Worker) => {
  return worker.user?.email || worker.email || 'N/A';
};

// Helper to get numeric rating
const getNumericRating = (worker: Worker) => {
  const rating = worker.rating;
  return typeof rating === 'string' ? parseFloat(rating) : rating;
};

// Helper to format 24h/ISO time strings to a readable format
const formatBookingTime = (timeStr: string) => {
  if (!timeStr) return '';
  try {
    if (timeStr.match(/^\d{2}:\d{2}/)) {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return timeStr;
  } catch (e) {
    return timeStr;
  }
};

const WorkersPage: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [showSlotsModal, setShowSlotsModal] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsWorker, setDetailsWorker] = useState<Worker | null>(null);
  const [workerBookings, setWorkerBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Edit states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editWorker, setEditWorker] = useState<Worker | null>(null);
  const [editForm, setEditForm] = useState({
    bio: '',
    rating: '',
    serviceRadiusKm: '',
    isActive: false,
    isAvailable: false,
    serviceIds: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [allServices, setAllServices] = useState<any[]>([]);

  const handleViewSlots = async (worker: Worker) => {
    setSelectedWorker(worker);
    setShowSlotsModal(true);
    setLoadingSlots(true);
    try {
      const allSlots = await apiService.getSlots();
      const workerSlots = allSlots.filter((slot: any) => {
        const slotWorkerId = slot.workerId || slot.worker?.id;
        return String(slotWorkerId) === String(worker.id);
      });
      // Sort slots by start time
      workerSlots.sort((a: any, b: any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      setSlots(workerSlots);
    } catch (err) {
      console.error('Failed to load slots:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleViewDetails = async (worker: Worker) => {
    setDetailsWorker(worker);
    setShowDetailsModal(true);
    setLoadingBookings(true);
    setWorkerBookings([]);
    try {
      const allBookings = await apiService.getBookings();
      const filtered = allBookings.filter((b: any) => 
        String(b.workerId) === String(worker.id) ||
        String(b.worker?.id) === String(worker.id)
      );
      // Sort descending by date
      filtered.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setWorkerBookings(filtered);
    } catch (err) {
      console.error('Failed to fetch worker bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleEditClick = (worker: Worker) => {
    setEditWorker(worker);
    const ratingVal = getNumericRating(worker);
    setEditForm({
      bio: worker.bio || '',
      rating: typeof ratingVal === 'number' ? ratingVal.toString() : '0.0',
      serviceRadiusKm: worker.serviceRadiusKm ? worker.serviceRadiusKm.toString() : '5.0',
      isActive: worker.isActive,
      isAvailable: worker.isAvailable,
      serviceIds: worker.services ? worker.services.map((s: any) => String(typeof s === 'object' ? s.id : s)) : [],
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editWorker) return;
    setSaving(true);
    try {
      const updated = await apiService.updateWorker(String(editWorker.id), {
        bio: editForm.bio,
        rating: parseFloat(editForm.rating),
        serviceRadiusKm: parseFloat(editForm.serviceRadiusKm),
        isActive: editForm.isActive,
        isAvailable: editForm.isAvailable,
        serviceIds: editForm.serviceIds,
      } as any);

      setWorkers((prev) =>
        prev.map((w) => (String(w.id) === String(editWorker.id) ? { ...w, ...updated } : w))
      );
      setShowEditModal(false);
      setEditWorker(null);
    } catch (err: any) {
      console.error('Failed to update worker:', err);
      alert(err.response?.data?.message || 'Failed to update professional details');
    } finally {
      setSaving(false);
    }
  };

  const handleServiceCheckboxChange = (serviceId: string, checked: boolean) => {
    setEditForm((prev) => {
      const currentIds = [...prev.serviceIds];
      if (checked) {
        if (!currentIds.includes(serviceId)) {
          currentIds.push(serviceId);
        }
      } else {
        const idx = currentIds.indexOf(serviceId);
        if (idx > -1) {
          currentIds.splice(idx, 1);
        }
      }
      return { ...prev, serviceIds: currentIds };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workerData, serviceData] = await Promise.all([
          apiService.getWorkers(),
          apiService.getServices(),
        ]);
        setWorkers(workerData);
        setAllServices(serviceData);
      } catch (err: any) {
        console.error('Failed to fetch workers or services:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAvailability = async (workerId: string) => {
    try {
      const updatedWorker = await apiService.toggleWorkerAvailability(workerId);
      setWorkers((prev) =>
        prev.map((w) => (String(w.id) === String(workerId) ? updatedWorker : w))
      );
    } catch (err: any) {
      console.error('Failed to toggle worker availability:', err);
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    const { firstName, lastName } = getWorkerName(worker);
    const email = getWorkerEmail(worker);

    const matchesSearch =
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'active' && worker.isActive && worker.isAvailable) ||
      (filterStatus === 'inactive' && !worker.isActive) ||
      (filterStatus === 'unavailable' && worker.isActive && !worker.isAvailable);

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (worker: Worker) => {
    if (!worker.isActive) {
      return <span className="badge badge-inactive">Inactive</span>;
    }
    if (worker.isAvailable) {
      return <span className="badge badge-active">Active & Available</span>;
    }
    return <span className="badge badge-pending">Active & Unavailable</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Workers Management</h1>
        <span className="text-sm text-gray-500">
          {filteredWorkers.length} of {workers.length} workers
        </span>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field md:w-48"
          >
            <option value="all">All Status</option>
            <option value="active">Active & Available</option>
            <option value="inactive">Inactive</option>
            <option value="unavailable">Active & Unavailable</option>
          </select>
        </div>
      </div>

      {/* Workers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Worker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No workers found
                  </td>
                </tr>
              ) : (
                filteredWorkers.map((worker) => {
                  const { firstName, lastName } = getWorkerName(worker);
                  const email = getWorkerEmail(worker);
                  const rating = getNumericRating(worker);
                  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'W';

                  return (
                    <tr key={worker.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                            {initials}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {firstName} {lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {worker.publicId?.slice(0, 8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ⭐ {typeof rating === 'number' ? rating.toFixed(1) : '0.0'} ({worker.reviewCount || 0})
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {worker.services && worker.services.length > 0 ? (
                            worker.services.map((svc: any, idx) => {
                              const svcName = typeof svc === 'object' ? svc.name : svc;
                              return (
                                <span key={idx} className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-primary-50 text-primary-700 rounded border border-primary-100">
                                  {svcName}
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-xs text-gray-400">None</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(worker)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleAvailability(String(worker.id))}
                            className="text-sm text-primary-600 hover:text-primary-800"
                          >
                            {worker.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                          </button>
                          <button
                            onClick={() => handleViewSlots(worker)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                          >
                            View Slots
                          </button>
                          <button
                            onClick={() => handleViewDetails(worker)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleEditClick(worker)}
                            className="text-sm text-emerald-600 hover:text-emerald-800 font-semibold"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slots Modal */}
      {showSlotsModal && selectedWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Time Slots for {getWorkerName(selectedWorker).firstName} {getWorkerName(selectedWorker).lastName}
                </h3>
                <p className="text-xs text-gray-500">ID: {selectedWorker.publicId}</p>
              </div>
              <button
                onClick={() => {
                  setShowSlotsModal(false);
                  setSelectedWorker(null);
                  setSlots([]);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
              {loadingSlots ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No slots found for this professional.
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(
                    slots.reduce((groups: { [key: string]: any[] }, slot) => {
                      const dateStr = new Date(slot.startTime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });
                      if (!groups[dateStr]) groups[dateStr] = [];
                      groups[dateStr].push(slot);
                      return groups;
                    }, {})
                  ).map(([dateStr, dateSlots]) => (
                    <div key={dateStr} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-1.5 flex justify-between items-center">
                        <span>{dateStr}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                          {dateSlots.length} Slots
                        </span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {dateSlots.map((slot) => {
                          const startStr = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          const endStr = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          return (
                            <div
                              key={slot.id}
                              className={`p-2.5 rounded border text-center text-xs flex flex-col justify-center gap-1 ${
                                slot.isBooked
                                  ? 'bg-red-50 border-red-200 text-red-700'
                                  : 'bg-green-50 border-green-200 text-green-700'
                              }`}
                            >
                              <span className="font-bold">{startStr} - {endStr}</span>
                              <span className={`text-[9px] font-semibold uppercase tracking-wider ${
                                slot.isBooked ? 'text-red-500' : 'text-green-600'
                              }`}>
                                {slot.isBooked ? '🔴 Booked' : '🟢 Free'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowSlotsModal(false);
                  setSelectedWorker(null);
                  setSlots([]);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && detailsWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Professional Profile Details
                </h3>
                <p className="text-xs text-gray-500">Public ID: {detailsWorker.publicId}</p>
              </div>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setDetailsWorker(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-2xl">
                  {`${getWorkerName(detailsWorker).firstName?.[0] || ''}${getWorkerName(detailsWorker).lastName?.[0] || ''}`.toUpperCase() || 'W'}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {getWorkerName(detailsWorker).firstName} {getWorkerName(detailsWorker).lastName}
                  </h4>
                  <div className="flex gap-2 items-center mt-1">
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                      detailsWorker.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {detailsWorker.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                      detailsWorker.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {detailsWorker.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</label>
                  <p className="mt-1 text-sm text-gray-900 font-medium">{getWorkerEmail(detailsWorker)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</label>
                  <p className="mt-1 text-sm text-gray-900 font-medium">{detailsWorker.phone || detailsWorker.user?.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Rating & Reviews</label>
                  <p className="mt-1 text-sm text-gray-900 font-medium">
                    ⭐ {getNumericRating(detailsWorker).toFixed(1)} ({detailsWorker.reviewCount || 0} reviews)
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Service Radius</label>
                  <p className="mt-1 text-sm text-gray-900 font-medium">{detailsWorker.serviceRadiusKm} km</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Geographic Latitude</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono text-gray-700">{detailsWorker.latitude || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Geographic Longitude</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono text-gray-700">{detailsWorker.longitude || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Database ID</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono text-gray-700">{detailsWorker.id}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Registered On</label>
                  <p className="mt-1 text-sm text-gray-900">{detailsWorker.createdAt ? new Date(detailsWorker.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

              {detailsWorker.bio && (
                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Biography / Description</label>
                  <p className="mt-1.5 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 italic leading-relaxed">
                    "{detailsWorker.bio}"
                  </p>
                </div>
              )}

              {detailsWorker.services && detailsWorker.services.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Offered Services</label>
                  <div className="flex flex-wrap gap-1.5">
                    {detailsWorker.services.map((svc: any, idx) => {
                      const svcName = typeof svc === 'object' ? svc.name : svc;
                      return (
                        <span key={idx} className="inline-block px-2.5 py-1 text-xs font-semibold bg-primary-50 text-primary-700 rounded-full border border-primary-100">
                          {svcName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Booking History Section */}
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Booking History</label>
                {loadingBookings ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                  </div>
                ) : workerBookings.length === 0 ? (
                  <div className="text-sm text-gray-500 italic py-2">No bookings assigned to this professional.</div>
                ) : (
                  <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="p-2.5 font-semibold text-gray-600">ID / Date</th>
                          <th className="p-2.5 font-semibold text-gray-600">Type</th>
                          <th className="p-2.5 font-semibold text-gray-600">Service</th>
                          <th className="p-2.5 font-semibold text-gray-600">Customer</th>
                          <th className="p-2.5 font-semibold text-gray-600">Amount</th>
                          <th className="p-2.5 font-semibold text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 bg-white">
                        {workerBookings.map((b) => {
                          const statusColors: Record<string, string> = {
                            requested: 'bg-blue-50 text-blue-700 border-blue-200',
                            confirmed: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                            in_progress: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                            completed: 'bg-green-50 text-green-700 border-green-200',
                            cancelled: 'bg-red-50 text-red-700 border-red-200',
                          };
                          const statusClass = statusColors[b.status?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
                          const displayType = b.type === 'subscription' ? 'Subscription' : 'One-Time';
                          const typeBadgeClass = b.type === 'subscription' 
                            ? 'bg-purple-50 text-purple-700 border-purple-200' 
                            : 'bg-orange-50 text-orange-700 border-orange-200';
                          return (
                            <tr key={b.id} className="hover:bg-gray-50">
                              <td className="p-2.5">
                                <div className="font-semibold text-gray-900 font-mono">#{b.publicId?.slice(0, 8)}</div>
                                <div className="text-gray-600 text-[10px] font-semibold mt-0.5">{b.date}</div>
                                {b.startTime && (
                                  <div className="text-indigo-600 text-[10px] font-bold mt-0.5 whitespace-nowrap">
                                    🕒 {formatBookingTime(b.startTime)}{b.endTime ? ` - ${formatBookingTime(b.endTime)}` : ''}
                                  </div>
                                )}
                              </td>
                              <td className="p-2.5 whitespace-nowrap">
                                <span className={`inline-block px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${typeBadgeClass}`}>
                                  {displayType}
                                </span>
                              </td>
                              <td className="p-2.5 text-gray-800 font-medium">{b.service?.name || b.serviceName || 'Service'}</td>
                              <td className="p-2.5">
                                <div className="text-gray-900">
                                  {b.user ? `${b.user.firstName || ''} ${b.user.lastName || ''}`.trim() : (b.customerName || 'N/A')}
                                </div>
                                <div className="text-gray-500 text-[10px]">{b.user?.phone || b.customerPhone}</div>
                              </td>
                              <td className="p-2.5 font-bold text-gray-900">₹{Number(b.amount ?? 0).toFixed(2)}</td>
                              <td className="p-2.5">
                                <span className={`inline-block px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${statusClass}`}>
                                  {b.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowDetailsModal(false);
                  setDetailsWorker(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Edit Professional Details
                </h3>
                <p className="text-xs text-gray-500">Worker ID: {editWorker.publicId}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setEditWorker(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-150">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                  {`${getWorkerName(editWorker).firstName?.[0] || ''}${getWorkerName(editWorker).lastName?.[0] || ''}`.toUpperCase() || 'W'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{getWorkerName(editWorker).firstName} {getWorkerName(editWorker).lastName}</div>
                  <div className="text-xs text-gray-500">{getWorkerEmail(editWorker)}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biography / Description</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                  placeholder="Enter worker experience, specialties, etc..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating Score</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editForm.rating}
                    onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Radius (km)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={editForm.serviceRadiusKm}
                    onChange={(e) => setEditForm({ ...editForm, serviceRadiusKm: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.isActive}
                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Account Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.isAvailable}
                    onChange={(e) => setEditForm({ ...editForm, isAvailable: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Is Available</span>
                </label>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Offered Services Portfolio</label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-gray-50 border border-gray-200 rounded-lg">
                  {allServices.map((svc) => (
                    <label key={svc.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:bg-gray-100 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={editForm.serviceIds.includes(String(svc.id))}
                        onChange={(e) => handleServiceCheckboxChange(String(svc.id), e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span>{svc.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setEditWorker(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 transition-colors text-sm font-semibold"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WorkersPage;
