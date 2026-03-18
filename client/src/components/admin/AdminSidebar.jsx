import { Home } from 'lucide-react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
  const location = useLocation();
  console.log(location)
  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <Link to="/" className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Fore Site Admin</div>

            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className={`px-4 py-3 ${location.pathname === "/admin/dashboard" ? "bg-blue-50 rounded-lg border border-blue-200" : "text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"} flex items-center gap-3 cursor-pointer transition`}>
            <svg className={`w-5 h-5 ${location.pathname === "/admin/dashboard" ? "text-blue-600" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span className={`text-sm font-medium ${location.pathname === "/admin/dashboard" ? "text-blue-600" : "text-gray-600"}`}>Dashboard</span>
          </Link>

          <Link to="/admin/property-management" className={`px-4 py-3 ${location.pathname === "/admin/property-management" ? "bg-blue-50 rounded-lg border border-blue-200" : "text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"} flex items-center gap-3 cursor-pointer transition`}>
            <svg className={`w-5 h-5 ${location.pathname === "/admin/property-management" ? "text-blue-600" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            </svg>
            <span className={`text-sm font-medium ${location.pathname === "/admin/property-management" ? "text-blue-600" : "text-gray-600"}`}>Property Management</span>
          </Link>

          <Link to="/admin/user-management" className={`px-4 py-3 ${location.pathname === "/admin/user-management" ? "bg-blue-50 rounded-lg border border-blue-200" : "text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"} flex items-center gap-3 cursor-pointer transition`}>
            <svg className={`w-5 h-5 ${location.pathname === "/admin/user-management" ? "text-blue-600" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={`text-sm font-medium ${location.pathname === "/admin/user-management" ? "text-blue-600" : "text-gray-600"}`}>User Management</span>
          </Link>

      

          <Link to="/" className={`px-4 py-3 ${location.pathname === "/admin/system-settings" ? "bg-blue-50 rounded-lg border border-blue-200" : "text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"} flex items-center gap-3 cursor-pointer transition`}>
            <Home/>
            <span className={`text-sm font-medium ${location.pathname === "/admin/system-settings" ? "text-blue-600" : "text-gray-600"}`}>Go Back</span>
          </Link>
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">System Status</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">AI Engine Online</span>
          </div>
        </div>
      </div>
  )
}

export default AdminSidebar