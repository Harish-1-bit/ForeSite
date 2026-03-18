'use client';

import { useEffect, useState } from 'react';
import SellerSidebar from '../../components/seller/sellerSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { editProperty, getAllsellerProperties } from '../../features/seller/SellerSlice';import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddPropertyModal from '../../components/seller/AddPropertyModal';
import {LoaderScreen} from '../../components/LoaderScreen';

export default function SellerListing() {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { allProperties, sellerLoading, sellerError, sellerMessage } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'pending'

    const handleModal =()=>{
        setOpenModal(!openModal);
    }

    const handleEdit = (property)=>{
        dispatch(editProperty(property))
        handleModal()
    }

        // Filter properties
    const filteredProperties = allProperties?.filter(property => {
        const matchesSearch = property.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              property.address?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' ? true : 
                              filterStatus === 'active' ? property.isActive : 
                              !property.isActive;
        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        dispatch(getAllsellerProperties());
        if (sellerError && sellerMessage) {
            toast.error(sellerMessage);
        }
    }, [sellerError, sellerMessage]);
    if(sellerLoading){
        return <LoaderScreen/>
    }



    return (
        <div className="flex h-screen bg-[#F8FAFC]">
    {
        openModal && <AddPropertyModal openModal={openModal} handleModal={handleModal} />
    }
                <SellerSidebar />
            <div className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-96 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by property title or address..."
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400 text-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setOpenModal(true)} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95">
                                <Plus className="w-4 h-4" />
                                Add New Property
                            </button>
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
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Properties</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage all your property listings from here.</p>
                        </div>
                        
                        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                            <button 
                                onClick={() => setFilterStatus('all')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filterStatus === 'all' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                All
                            </button>
                            <button 
                                onClick={() => setFilterStatus('active')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filterStatus === 'active' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Active
                            </button>
                            <button 
                                onClick={() => setFilterStatus('pending')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filterStatus === 'pending' ? 'bg-amber-50 text-amber-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Pending
                            </button>
                        </div>
                    </div>

                    {filteredProperties?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 border-dashed">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Building2 className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                            <p className="text-gray-500 mt-1 mb-6 text-center max-w-sm">
                                {searchQuery ? "We couldn't find any properties matching your search." : "You haven't listed any properties yet."}
                            </p>
                            {!searchQuery && (
                                <Link to="/seller/add-property" className="text-blue-600 font-medium hover:underline">
                                    Create your first listing
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProperties?.map((property, index) => (
                                <motion.div
                                    key={property._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                                        {property?.propertyImage ? (
                                            <img 
                                                src={property?.propertyImage[0]} 
                                                alt={property?.title} 
                                                className="w-full h-full object-cover bg-center bg-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Building2 className="w-12 h-12 opacity-50" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm backdrop-blur-md ${
                                                property.isActive 
                                                ? 'bg-emerald-500/90 text-white' 
                                                : 'bg-amber-500/90 text-white'
                                            }`}>
                                                {property.isActive ? 'Active' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                                {property.title}
                                            </h3>
                                            <p className="text-lg font-bold text-blue-600 whitespace-nowrap ml-4">
                                                ₹ {property.price?.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-1.5 text-gray-500 text-sm mb-4">
                                            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                            <p className="line-clamp-1">{property.address}, {property.city}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-100 mb-4">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                                                    <Bed className="w-4 h-4 text-gray-400" />
                                                    <span>{property.configuration || 'N/A'}</span>
                                                </div>
                                                <span className="text-[10px] text-gray-400 uppercase font-medium mt-0.5">Config</span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center border-l border-gray-100">
                                                <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                                                    <Square className="w-4 h-4 text-gray-400" />
                                                    <span>{property.sqFeet || 0}</span>
                                                </div>
                                                <span className="text-[10px] text-gray-400 uppercase font-medium mt-0.5">Sq Ft</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto flex gap-2">
                                            <button onClick={()=>handleEdit(property)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                                                <Edit className="w-4 h-4" /> Edit
                                            </button>
                                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                                                <Eye className="w-4 h-4" /> View
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
