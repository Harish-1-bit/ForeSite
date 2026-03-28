import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties, getAllUser } from "../../features/admin/adminSlice";
import { Users, LayoutDashboard, Building2, Search, Bell, User } from "lucide-react";
import { toast } from "sonner";
import { LoaderScreen } from "../../components/LoaderScreen.jsx";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { allUser, allProperties, adminLoading, adminError, adminMessage } =
    useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminError && adminMessage) {
      toast.error(adminMessage);
    }
    dispatch(getAllProperties());
    dispatch(getAllUser());
  }, [adminError, adminMessage, dispatch]);

  if (adminLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

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
            <div className="hidden sm:block relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search global records..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 w-64 lg:w-80 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">
                  ForeSite Admin
                </div>
                <div className="text-[0.6rem] font-bold text-emerald-500 uppercase tracking-widest">
                  System Superuser
                </div>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Properties", value: allProperties?.length || 0, icon: Building2, color: "blue", trend: "+12.5%" },
                { label: "Total Users", value: allUser?.length || 0, icon: Users, color: "emerald", trend: "+4.3%" },
                { label: "Monthly Revenue", value: "₹ 145,200", icon: LayoutDashboard, color: "purple", trend: "+18.2%" },
                { label: "AI Accuracy", value: "98.4%", icon: Search, color: "rose", trend: "-0.2%" }
              ].map((card, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-${card.color}-50 rounded-xl flex items-center justify-center text-${card.color}-600 group-hover:scale-110 transition-transform`}>
                      <card.icon size={24} />
                    </div>
                    <div className={`text-xs font-bold ${card.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} bg-${card.trend.startsWith('+') ? 'emerald' : 'rose'}-50 px-2 py-1 rounded-lg`}>
                      {card.trend}
                    </div>
                  </div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
                    {card.label}
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {card.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Property Listings */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Property Listings
                  </h2>
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">
                    View Registry
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="text-left px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Property Details</th>
                        <th className="text-left px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Location</th>
                        <th className="text-left px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Valuation</th>
                        <th className="text-center px-6 py-4 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allProperties?.slice(0, 5).map((property) => (
                        <tr key={property._id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={property.propertyImage?.[0] || 'https://via.placeholder.com/150'}
                                alt={property.title}
                                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-slate-200 transition-all"
                              />
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 truncate max-w-[180px]">{property.title}</div>
                                <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-tight">{property.propertyType}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-slate-700">{property.city}</div>
                            <div className="text-[0.65rem] font-bold text-slate-400 truncate max-w-[150px]">{property.address}</div>
                          </td>
                          <td className="px-6 py-4 font-black text-slate-900">
                            ₹{property.price?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex px-3 py-1 rounded-lg text-[0.6rem] font-black uppercase tracking-widest ${
                              property.isActive 
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                : "bg-rose-50 text-rose-600 border border-rose-100"
                            }`}>
                              {property.isActive ? "Active" : "Archived"}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {(!allProperties || allProperties.length === 0) && (
                        <tr>
                          <td colSpan="4" className="py-20 text-center">
                            <div className="text-slate-300 font-bold italic">No active property records found</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Activity */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-bold text-slate-900">
                    Trusted Sellers
                  </h2>
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                    <Users size={16} />
                  </div>
                </div>

                <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {allUser?.filter(u => u.role === "seller").slice(0, 10).map((user) => (
                    <div key={user._id} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <User size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-slate-900">
                          {user.name}
                        </h3>
                        <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-100 flex-shrink-0"></div>
                    </div>
                  ))}
                  {(!allUser || allUser.filter(u => u.role === "seller").length === 0) && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-300 space-y-2">
                       <Users size={40} className="mb-2 opacity-20" />
                       <div className="font-bold italic text-sm">No sellers registered</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
