import React, { useState, useEffect, useRef } from 'react';
import { apiService, Advertisement } from '../services/api';

const AdvertisementsPage: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);

  // Global settings state
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAdsAndSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const adsData = await apiService.getAdvertisements();
      setAds(adsData || []);
      
      const settingsData = await apiService.getAdSettings();
      setAdsEnabled(settingsData.adsEnabled);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
      setIsSettingsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdsAndSettings();
  }, []);

  const openCreateModal = () => {
    setEditingAd(null);
    setTitle('');
    setVideoUrl('');
    setRedirectUrl('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (ad: Advertisement) => {
    setEditingAd(ad);
    setTitle(ad.title || '');
    setVideoUrl(ad.videoUrl);
    setRedirectUrl(ad.redirectUrl || '');
    setIsActive(ad.isActive);
    setIsModalOpen(true);
  };

  const handleToggleGlobalAds = async () => {
    const newValue = !adsEnabled;
    setAdsEnabled(newValue);
    try {
      await apiService.updateAdSettings(newValue);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update settings');
      setAdsEnabled(!newValue); // Rollback
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    try {
      const url = await apiService.uploadAdVideo(file);
      // Construct full backend path so it resolves on localhost
      const fullUrl = `http://localhost:3000${url}`;
      setVideoUrl(fullUrl);
      alert('Video uploaded successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to upload video file. Make sure it is an MP4/WebM file under 50MB.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;

    setIsSubmitting(true);
    try {
      const payload = { title, videoUrl, redirectUrl, isActive };
      if (editingAd) {
        await apiService.updateAdvertisement(editingAd.id, payload);
      } else {
        await apiService.createAdvertisement(payload);
      }
      setIsModalOpen(false);
      fetchAdsAndSettings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save advertisement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (ad: Advertisement) => {
    try {
      await apiService.updateAdvertisement(ad.id, { isActive: !ad.isActive });
      fetchAdsAndSettings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to toggle status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this advertisement?')) return;

    try {
      await apiService.deleteAdvertisement(id);
      fetchAdsAndSettings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete advertisement');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header section with Global toggle switch */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ads Manager</h1>
          <p className="text-sm text-gray-500">Manage floating video advertisements for the home page of the customer app</p>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-150">
          <span className="text-sm font-semibold text-gray-700">Show Ad Card on App Home Page</span>
          <button
            onClick={handleToggleGlobalAds}
            disabled={isSettingsLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              adsEnabled ? 'bg-teal-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                adsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-xs font-bold ${adsEnabled ? 'text-teal-600' : 'text-gray-400'}`}>
            {adsEnabled ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Advertisements List</h2>
        <button
          onClick={openCreateModal}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
        >
          <span>➕</span> Add Advertisement
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          <p>{error}</p>
        </div>
      ) : ads.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <p className="text-gray-500 mb-4">No advertisements created yet.</p>
          <button
            onClick={openCreateModal}
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            Create your first ad
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[9/16] max-h-[300px] w-full bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={ad.videoUrl}
                    key={ad.videoUrl}
                    className="h-full w-full object-cover"
                    muted
                    controls
                    loop
                  />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full shadow-md ${
                    ad.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ad.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{ad.title || 'Untitled Ad'}</h3>
                  <p className="text-xs text-gray-400 break-all mb-3">Video: {ad.videoUrl}</p>
                  {ad.redirectUrl && (
                    <p className="text-sm text-teal-600 hover:underline break-all mb-2">
                      🔗 <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer">{ad.redirectUrl}</a>
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleToggleActive(ad)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    ad.isActive
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {ad.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(ad)}
                    className="text-blue-600 hover:text-blue-700 text-sm p-1 font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="text-red-600 hover:text-red-700 text-sm p-1 font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingAd ? 'Edit Advertisement' : 'Add Advertisement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cooking Service Special Promo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Video upload input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Resource</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/ad.mp4 or Upload file"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="video/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-1.5"
                  >
                    {isUploading ? 'Uploading...' : '📁 Upload File'}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Specify a link to a video file, or upload a local MP4/WebM file (max 50MB).</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/promo-target"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Set as active advertisement</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-4 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-lg font-medium"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertisementsPage;
