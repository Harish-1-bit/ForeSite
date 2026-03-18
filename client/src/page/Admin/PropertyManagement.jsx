'use client';

import { useEffect, useState } from 'react';
import { getAllProperties } from '../../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
import { LoaderScreen } from '../../components/LoaderScreen';
export default function PropertyManagement() {
    const { allProperties,adminLoading,adminError,adminMessage} = useSelector((state) => state.admin);
    const dispatch = useDispatch()
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');


  const properties = allProperties;

  const filteredProperties = properties.filter((property) => {
    const matchesStatus = selectedStatus === 'all' || (selectedStatus==="Active" && property.isActive) || (selectedStatus==="In-Active" && !property.isActive);
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  

  useEffect(() => {
    if(adminError && adminMessage){
      toast.error(adminMessage);
    }
    dispatch(getAllProperties());
  }, [adminError,adminMessage]);
  if(adminLoading){
    return <LoaderScreen/>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar/>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search properties, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500"
              />
            </div>
            <div className="flex items-center gap-6">
              <button className="relative text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Alex Rivera</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera" alt="Alex Rivera" className="w-10 h-10 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
            <p className="text-gray-600">Manage and monitor all property listings</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            

            {/* Status Filter */}
            <div className="px-4 py-3 border  border-gray-300 rounded-lg text-sm text-gray-700 bg-white">
                <select className='w-full'
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="In-Active">In-Active</option>
            </select>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Property</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Details</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Agent</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={property.propertyImage[0]} alt={property.title} className="w-10 h-10 rounded object-cover" />
                          <span className="font-medium text-gray-900">{property.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">{property.address}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{property.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          <div>{property.description} </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">{property.owner.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded ${property.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {property.isActive ? "Active" : "Inactive"    }
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Eye className='text-blue-600'/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <span className="text-sm text-gray-600">
                Showing {filteredProperties.length} of {properties.length} properties
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
