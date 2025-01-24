import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Car, Shield, QrCode, Users, Settings, Menu } from 'lucide-react';
import { Scanner } from './components/Scanner';
import { Dashboard } from './components/Dashboard';
import { VehicleList } from './components/VehicleList';
import { AccessLogs } from './components/AccessLogs';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-600 text-white min-h-screen p-4">
          <div className="flex items-center gap-3 mb-8">
            <Shield size={32} />
            <div>
              <h1 className="text-xl font-bold">SecurePass</h1>
              <p className="text-sm text-blue-200">Vehicle Security</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition-colors">
              <Car size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/scanner" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition-colors">
              <QrCode size={20} />
              <span>Scanner</span>
            </Link>
            <Link to="/vehicles" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition-colors">
              <Users size={20} />
              <span>Vehicles</span>
            </Link>
            <Link to="/logs" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition-colors">
              <Settings size={20} />
              <span>Access Logs</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/logs" element={<AccessLogs />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
