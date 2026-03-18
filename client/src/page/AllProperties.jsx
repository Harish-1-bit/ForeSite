'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesCustomer } from '../features/customer/CustomerSlice';
import { LoaderScreen } from '../components/LoaderScreen';
import { toast } from 'sonner';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export function AllProperties() {
    const navigate = useNavigate()
    const {allPropertyCustomer,customerLoading,customerError,customerMessage}=useSelector((state)=>state.customer)
    const dispatch = useDispatch()

  const [activeNav, setActiveNav] = useState('properties');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const allProperties = allPropertyCustomer;

  const filteredProperties = allProperties?.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProperties?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties?.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case true:
        return 'bg-green-100 text-green-700';
      case false:
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getAiScoreColor = (score) => {
    if (score >= 9) return 'bg-green-100 text-green-700';
    if (score >= 8) return 'bg-blue-100 text-blue-700';
    if (score >= 7) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

      useEffect(() => {
        dispatch(getPropertiesCustomer())
        if(customerError && customerMessage){
            toast.error(customerMessage)
        }
    }, [customerError,customerMessage])

    if(customerLoading){
        return <LoaderScreen/>
    }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <NavBar/>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
              <p className="text-gray-500 text-sm mt-1">Manage and view all your property listings</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="px-8 pb-6 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search properties, location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>


        <div className="p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProperties?.map((property) => (
                <div onClick={() => navigate(`/property/${property._id}`)} key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img src={property.propertyImage[0]} alt={property.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.isActive)}`}>
                        {property.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>


                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{property.address}, {property.city}, {property.state}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">{property.price}</span>

                    <div className="gap-3 mb-4 text-sm">
                        <p className="text-gray-500 text-xs mb-1">Sq. Ft</p>
                        <p className="font-semibold text-gray-900">{property.sqFeet}</p>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{startIndex + 1}</span> to <span className="font-semibold">{Math.min(startIndex + itemsPerPage, filteredProperties?.length)}</span> of <span className="font-semibold">{filteredProperties?.length}</span> properties
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
