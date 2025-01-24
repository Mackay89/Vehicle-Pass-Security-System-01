import React from 'react';
import { useStore } from '../store/useStore';
import { Car, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const vehicles = useStore((state) => state.vehicles);
  
  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.isVerified).length,
    pending: vehicles.filter(v => !v.isVerified).length,
    recent: vehicles.filter(v => {
      const lastDay = new Date();
      lastDay.setDate(lastDay.getDate() - 1);
      return v.lastScanned && new Date(v.lastScanned) > lastDay;
    }).length
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Car className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Passes</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <ShieldCheck className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <AlertTriangle className="text-yellow-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recent Access</p>
              <p className="text-2xl font-bold text-purple-600">{stats.recent}</p>
            </div>
            <Clock className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {vehicles.slice(0, 5).map(vehicle => (
              <div key={vehicle.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{vehicle.plateNumber}</p>
                  <p className="text-sm text-gray-600">{vehicle.owner}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  vehicle.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vehicle.isVerified ? 'Active' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Scanner Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Connection</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Sync</span>
              <span className="text-sm text-gray-600">2 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
