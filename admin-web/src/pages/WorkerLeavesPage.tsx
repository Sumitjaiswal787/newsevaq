import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import { WorkerLeave, Worker } from '../types';

export default function WorkerLeavesPage() {
  const [leaves, setLeaves] = useState<WorkerLeave[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState<WorkerLeave | null>(null);
  const [selectedBackupWorker, setSelectedBackupWorker] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [fetchedLeaves, fetchedWorkers] = await Promise.all([
        apiService.getWorkerLeaves(),
        apiService.getWorkers(),
      ]);
      setLeaves(fetchedLeaves);
      setWorkers(fetchedWorkers.filter((w: Worker) => w.isActive && w.isAvailable));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApprove = async () => {
    if (!selectedLeave || !selectedBackupWorker) return;
    try {
      await apiService.updateWorkerLeaveStatus(selectedLeave.id, 'APPROVED');
      await apiService.assignBackupWorkerForLeave(selectedLeave.id, selectedBackupWorker);
      setShowModal(false);
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Failed to approve leave');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await apiService.updateWorkerLeaveStatus(id, 'REJECTED');
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Worker Leaves</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{leave.worker?.user?.firstName} {leave.worker?.user?.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{leave.startDate} to {leave.endDate}</td>
                  <td className="px-6 py-4">{leave.reason || 'None'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' : leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {leave.status === 'PENDING' && (
                      <>
                        <button onClick={() => { setSelectedLeave(leave); setShowModal(true); }} className="text-indigo-600 hover:text-indigo-900 mr-4">Approve & Assign Backup</button>
                        <button onClick={() => handleReject(leave.id)} className="text-red-600 hover:text-red-900">Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedLeave && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Approve Leave & Assign Backup</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-4">Select a backup worker for {selectedLeave.worker?.user?.firstName}</p>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={(e) => setSelectedBackupWorker(Number(e.target.value))}>
                    <option value="">Select a worker</option>
                    {workers.map(w => (
                      <option key={w.id} value={w.id}>{w.user?.firstName} {w.user?.lastName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleApprove} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Approve</button>
                <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
