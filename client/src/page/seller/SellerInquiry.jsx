import { useEffect, useState } from 'react';
import SellerSidebar from '../../components/seller/sellerSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  User,
  MapPin,
  Building2,
  Clock
} from 'lucide-react';
import { getAllInquiry, updateEnquiry } from '../../features/seller/SellerSlice';
import { toast } from 'sonner';

export default function SellerInquiry() {
    const { user } = useSelector((state) => state.auth);
    const { allInquiry, sellerLoading,sellerError,sellerMessage } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        dispatch(getAllInquiry());
        if((sellerError)){
            toast.error(sellerMessage);
        }
    }, [dispatch]);

    // Filter inquiries
    const filteredInquiries = allInquiry?.filter(inquiry => {
        const matchesSearch = inquiry.message?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              inquiry.buyer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              inquiry.property?.title?.toLowerCase().includes(searchQuery.toLowerCase());
        // Add status filter if backend supports status field in inquiry
        if (filterStatus === 'unread') {
            return matchesSearch && inquiry.status === 'pending';
        }
        return matchesSearch;
    });

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <SellerSidebar />

            <div className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-96 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search inquiries..."
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400 text-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                             <div className="h-8 w-px bg-gray-200 mx-1"></div>
                            <div className="flex items-center gap-2 pl-1">
                                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                                <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md ring-2 ring-white">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6 max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inquiries</h1>
                            <p className="text-sm text-gray-500 mt-1">View and manage messages from potential buyers.</p>
                        </div>
                        
                        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                            <button 
                                onClick={() => setFilterStatus('all')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filterStatus === 'all' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                All Messages
                            </button>
                            <button 
                                onClick={() => setFilterStatus('unread')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filterStatus === 'unread' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Unread
                            </button>
                        </div>
                    </div>

                    {filteredInquiries?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 border-dashed h-96">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No inquiries yet</h3>
                            <p className="text-gray-500 mt-1 text-center max-w-sm">
                                {searchQuery ? "No messages match your search criteria." : "When buyers contact you about your properties, their messages will appear here."}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredInquiries?.map((inquiry) => (
                                <div key={inquiry._id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Property Info */}
                                        <div className="lg:w-1/4 min-w-[200px] flex gap-3 items-start border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0 lg:pr-4">
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                {inquiry.property?.propertyImage?.[0] ? (
                                                    <img src={inquiry.property.propertyImage[0]} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Building2 className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 line-clamp-1">{inquiry.property?.title}</h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <MapPin className="w-3 h-3" />
                                                    <span className="line-clamp-1">{inquiry.property?.city}, {inquiry.property?.state}</span>
                                                </div>
                                                <div className="mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                                                    ₹ {inquiry.property?.price?.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buyer Info & Message */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                                        {inquiry.buyer?.name?.charAt(0) || <User className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{inquiry.buyer?.name || 'Unknown Buyer'}</h4>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                                                            {inquiry.buyer?.email && (
                                                                <span className="flex items-center gap-1">
                                                                    <Mail className="w-3 h-3" /> {inquiry.buyer.email}
                                                                </span>
                                                            )}
                                                            {inquiry.buyer?.phone && (
                                                                <span className="flex items-center gap-1">
                                                                    <Phone className="w-3 h-3" /> {inquiry.buyer.phone}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                                    <Clock className="w-3 h-3" />
                                                    {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : 'Recent'}
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 flex gap-3 items-start">
                                                <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                                <p className="leading-relaxed whitespace-pre-line">{inquiry.message}</p>
                                            </div>
                                            
                                            <div className="mt-4 flex flex-wrap gap-3 justify-end items-center">
                                                <div className="mr-auto">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                                        inquiry.status === 'closed' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                                        inquiry.status === 'responded' ? 'bg-green-50 text-green-700 border-green-200' :
                                                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                    }`}>
                                                        {inquiry.status ? inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1) : 'Pending'}
                                                    </span>
                                                </div>

                                                <select 
                                                    value={inquiry.status || 'pending'} 
                                                    onChange={(e) => dispatch(updateEnquiry({ ...inquiry, status: e.target.value }))}
                                                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="responded">Responded</option>
                                                    <option value="closed">Closed</option>
                                                </select>

                                                <a href={`mailto:${inquiry.buyer?.email}`} className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm shadow-blue-200">
                                                    <Mail className="w-4 h-4" /> Reply via Email
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

