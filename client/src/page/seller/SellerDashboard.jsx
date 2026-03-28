'use client';

import { useEffect, useState } from 'react';
import SellerSidebar from '../../components/seller/SellerSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Building2, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Plus,
  Filter
} from 'lucide-react';
import { getAllInquiry, getAllsellerProperties } from '../../features/seller/SellerSlice';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function SellerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { allProperties, allInquiry, sellerLoading, sellerError, sellerMessage } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getAllsellerProperties());
        dispatch(getAllInquiry());
        if (sellerError && sellerMessage) {
            toast.error(sellerMessage);
        }
    }, [sellerError, sellerMessage, dispatch]);

    // Calculate metrics
    const totalProperties = allProperties?.length || 0;
    const activeProperties = allProperties?.filter(p => p.isActive === true)?.length || 0;
    const totalInquiries = allInquiry?.length || 0;
    const pendingInquiries = allInquiry?.filter(i => i.status === 'pending')?.length || 0;
    const stats = [
        {
            title: 'Total Properties',
            value: totalProperties,
            change: '+12%',
            trend: 'up',
            icon: Building2,
            color: 'bg-blue-600',
            bg: 'bg-blue-50',
            text: 'text-blue-600'
        },
        {
            title: 'Active Listings',
            value: activeProperties,
            change: '+5%',
            trend: 'up',
            icon: TrendingUp,
            color: 'bg-emerald-600',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600'
        },
        {
            title: 'Total Inquiries',
            value: totalInquiries,
            change: '+18%',
            trend: 'up',
            icon: MessageSquare,
            color: 'bg-violet-600',
            bg: 'bg-violet-50',
            text: 'text-violet-600'
        },
        {
            title: 'Pending Action',
            value: pendingInquiries,
            change: '-2%',
            trend: 'down',
            icon: Clock,
            color: 'bg-amber-600',
            bg: 'bg-amber-50',
            text: 'text-amber-600'
        }
    ];

    const RecentInquiries = allInquiry?.slice(0, 5) || [];

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
            <SellerSidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            <div className="flex-1 overflow-auto flex flex-col h-full">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm shrink-0">
                    <div className="flex items-center justify-between px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100"
                            >
                                <Plus size={20} className="rotate-45" /> 
                            </button>
                            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-40 sm:w-80 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400 text-gray-700"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
                            <div className="flex items-center gap-2 pl-1">
                                <span className="text-sm font-bold text-gray-700 hidden sm:block">{user?.name}</span>
                                <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6 max-w-7xl mx-auto space-y-6">
                    {/* Welcome Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Overview</h1>
                            <p className="text-sm text-gray-500 mt-1">Here's what's happening today.</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                                <Filter className="w-3.5 h-3.5"/> Filter
                             </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.text} group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                                    }`}>
                                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {stat.change}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.title}</h3>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Properties */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] flex flex-col"
                        >
                            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="font-bold text-gray-900">Recent Listings</h2>
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Property</th>
                                            <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                            <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-5 py-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {allProperties?.slice(0, 5).map((property) => (
                                            <tr key={property._id} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden shrink-0 border border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                                                            {property.propertyImage[0] ? (
                                                                <img src={property.propertyImage[0]} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                                                    <Building2 className="w-5 h-5" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-gray-900 text-sm truncate">{property.title}</p>
                                                            <p className="text-xs text-gray-500 truncate">{property.address}, {property.city}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">
                                                    ₹ {property.price?.toLocaleString()}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                                        property.isActive
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                            : 'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}>
                                                        {property.isActive ? 'Active' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-right">
                                                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Recent Inquiries */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] flex flex-col h-[400px]"
                        >
                            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="font-bold text-gray-900">Recent Inquiries</h2>
                                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{totalInquiries}</span>
                            </div>
                            <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                                {RecentInquiries.length > 0 ? RecentInquiries.map((inquiry) => (
                                    <div key={inquiry._id} className="flex gap-3 group p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs ring-2 ring-white shadow-sm border border-indigo-100">
                                            {inquiry.buyer.name?.charAt(0) || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{inquiry.buyer.name || 'Unknown User'}</h4>
                                                <span className="text-[10px] text-gray-400 font-medium">2m ago</span>
                                            </div>
                                            <p className="text-xs text-indigo-500 font-medium truncate mb-0.5">{inquiry.property.title || 'Property Inquiry'}</p>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{inquiry.message}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                            <MessageSquare className="w-5 h-5 text-gray-300" />
                                        </div>
                                        <p className="text-sm">No new inquiries</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 border-t border-gray-50 bg-gray-50/30 rounded-b-xl">
                                <button className="w-full py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-white rounded border border-transparent hover:border-gray-200 hover:shadow-sm transition-all uppercase tracking-wide">
                                    View All Messages
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
