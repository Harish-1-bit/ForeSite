'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../features/admin/adminSlice';
import UserDetail from '../../components/admin/UserDetail';
import { toast } from 'sonner';
import { LoaderScreen } from '../../components/LoaderScreen';

export default function UserManagement() {
    const {allUser,adminLoading,adminError,adminMessage} = useSelector((state)=>state.admin)
     const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [userDetail, setUserDetail] = useState();

  const handleUserModal = (user) => {
    setUserDetail(user);
    setOpenModal(true);
  }

  const allUsers = allUser

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =selectedRole === "all" || user?.role?.toLowerCase() === selectedRole.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || user?.isActive && selectedStatus==='active' || !user?.isActive && selectedStatus==='inactive';
    return matchesSearch && matchesRole && matchesStatus;
  });

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIdx = (currentPage - 1) * usersPerPage;
  const displayedUsers = filteredUsers.slice(startIdx, startIdx + usersPerPage);


  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setCurrentPage(1);
  };


  const getRoleColor = (role) => {
    const colors = {
      'admin': 'bg-blue-100 text-blue-700',
      'seller': 'bg-green-100 text-green-700',
      'customer': 'bg-purple-100 text-purple-700',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  useEffect(()=>{
    if(adminError && adminMessage){
      toast.error(adminMessage)
    }
    dispatch(getAllUser())
  },[adminError,adminMessage])
  if(adminLoading){
    return <LoaderScreen/>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar/>
    {openModal && <UserDetail handleUserModal={handleUserModal} user={userDetail} isOpen={openModal} onClose={() => setOpenModal(false)} />}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Users</h2>
            <p className="text-sm text-gray-600">{allUser?.length} Total</p>
          </div>
          
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search users by name, email or ID..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <select
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <button
                  onClick={handleClearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 w">
                    <th className="pr-6 py-4 text-sm font-semibold text-gray-700 uppercase">User</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">Role</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">Join Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">Phone</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">View</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map((user) => (
                    <tr key={user._id} className="border-b  border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 w-1/5 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-center">{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 border-gray-200 rounded-lg p-2">
                          <div className={`flex items-center justify-center gap-2 px-2 py-1 rounded-lg ${user.isActive ? 'bg-green-100 border border-green-500' : 'bg-red-100 border border-red-500'}`}>

                          <span className={`text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">{user.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleUserModal(user)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="View">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <div>
                Showing {startIdx + 1}-{Math.min(startIdx + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 py-2 text-gray-400">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
