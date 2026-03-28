"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../features/admin/adminSlice";
import UserDetail from "../../components/admin/UserDetail";
import { toast } from "sonner";
import { LoaderScreen } from "../../components/LoaderScreen";
import {
  Search,
  Filter,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
  Eye,
  MoreVertical,
} from "lucide-react";

export default function UserManagement() {
  const { allUser, adminLoading, adminError, adminMessage } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUserModal = (user) => {
    setUserDetail(user);
    setOpenModal(true);
  };

  const filteredUsers = (Array.isArray(allUser) ? allUser : []).filter((user) => {
    const matchesSearch =
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "all" ||
      user?.role?.toLowerCase() === selectedRole.toLowerCase();
    const matchesStatus =
      selectedStatus === "all" ||
      (user?.isActive && selectedStatus === "active") ||
      (!user?.isActive && selectedStatus === "inactive");
    return matchesSearch && matchesRole && matchesStatus;
  });

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIdx = (currentPage - 1) * usersPerPage;
  const displayedUsers = filteredUsers.slice(startIdx, startIdx + usersPerPage);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
    setSelectedStatus("all");
    setCurrentPage(1);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-indigo-50 text-indigo-600 border-indigo-100",
      seller: "bg-emerald-50 text-emerald-600 border-emerald-100",
      customer: "bg-amber-50 text-amber-600 border-amber-100",
    };
    return (
      colors[role?.toLowerCase()] ||
      "bg-slate-50 text-slate-600 border-slate-100"
    );
  };

  useEffect(() => {
    if (adminError && adminMessage) {
      toast.error(adminMessage);
    }
  }, [adminError, adminMessage]);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  if (adminLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {openModal && (
        <UserDetail
          user={userDetail}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                Identity Management
              </h2>
              <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                {allUser?.length || 0} Registered Entities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <Shield size={20} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Control Bar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="relative group w-full lg:w-96">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by name, email or ID..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
                  <Filter size={14} className="text-slate-400" />
                  <select
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none py-1.5 cursor-pointer"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
                  <Shield size={14} className="text-slate-400" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none py-1.5 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest px-4 py-2 transition-colors ml-auto lg:ml-0"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Entity Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="text-left px-8 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                        User Entity
                      </th>
                      <th className="text-center px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                        Access Role
                      </th>
                      <th className="text-center px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                        Registration
                      </th>
                      <th className="text-center px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                        Terminal Status
                      </th>
                      <th className="text-center px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayedUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-slate-50 transition-colors group"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                              <UserIcon size={18} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">
                                {user.name}
                              </div>
                              <div className="text-[0.7rem] font-bold text-slate-400 flex items-center gap-1">
                                <Mail size={10} /> {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className={`inline-flex px-3 py-1 rounded-lg text-[0.65rem] font-black uppercase tracking-widest border ${getRoleColor(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="text-sm font-bold text-slate-700">
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-IN",
                            )}
                          </div>
                          <div className="text-[0.65rem] font-bold text-slate-400 uppercase">
                            Registered Date
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-widest ${
                              user.isActive
                                ? "text-emerald-500 bg-emerald-50/50"
                                : "text-rose-500 bg-rose-50/50"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
                            ></div>
                            {user.isActive ? "Live" : "Locked"}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleUserModal(user)}
                              className="p-2 hover:bg-slate-900 hover:text-white rounded-xl transition-all text-slate-400 group/btn shadow-sm hover:shadow-lg shadow-slate-100"
                              title="Manage User & Roles"
                            >
                              <Eye
                                size={18}
                                className="group-hover/btn:scale-110 transition-transform"
                              />
                            </button>
                            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-300">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {displayedUsers.length === 0 && (
                      <tr>
                        <td colSpan="5" className="py-20 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-300 space-y-2">
                            <Search size={40} className="mb-2 opacity-20" />
                            <div className="font-bold italic">
                              No matching records found in the database
                            </div>
                            <button
                              onClick={handleClearFilters}
                              className="text-xs font-black text-slate-900 uppercase tracking-widest underline decoration-2 underline-offset-4"
                            >
                              Reset Search
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deep Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
              <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ordered-1">
                Displaying {startIdx + 1}-
                {Math.min(startIdx + usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} Records
              </div>

              <div className="flex items-center gap-2 order-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex gap-1 h-9">
                  {Array.from({ length: Math.min(5, totalPages) }).map(
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 rounded-xl text-xs font-black transition-all ${
                            currentPage === pageNum
                              ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                              : "border border-slate-200 hover:bg-white text-slate-600"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    },
                  )}
                  {totalPages > 5 && (
                    <span className="flex items-end px-1 text-slate-400 font-black">
                      ...
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
