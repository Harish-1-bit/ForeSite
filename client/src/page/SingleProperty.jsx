import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProperty, aiResponse, resetAiResponse } from '../features/customer/CustomerSlice.js';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Home,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LoaderScreen } from '../components/LoaderScreen.jsx';
import { Toaster, toast } from 'sonner';

const SingleProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { singleProperty, aiResponse: aiData, customerLoading, customerError, customerMessage,aiLoading } = useSelector((state) => state.customer);

    const handleVerifyAIAnalysis = useCallback(()=>{
    dispatch(aiResponse(id));
    },[dispatch,id])

  useEffect(() => {
    if (id) {
      dispatch(resetAiResponse());
      dispatch(getSingleProperty(id));
    }
    if(customerError && customerMessage){
      Toaster.error(customerMessage);
    }
  }, [dispatch, id]);
  if (customerLoading ) {
    return (
      <LoaderScreen/>
    );
  }

  if (customerError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-xl">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} />
            </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-500 mb-6">{customerMessage || "Failed to load property details."}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!singleProperty) return null;

  const { property } = singleProperty;
  
  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-slate-100"
            >
                <ArrowLeft size={20} />
                <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Home size={18} />
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tight">ForeSite</span>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-3 mb-3"
                >
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest">
                        {property.propertyType}
                    </span>
                    {property.isActive && (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest">
                            Active Listing
                        </span>
                    )}
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight capitalize"
                >
                    {property.title}
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 text-slate-500 font-medium"
                >
                    <MapPin size={18} className="text-blue-500" />
                    {property.address}, {property.city}, {property.state} {property.zipcode}
                </motion.div>
            </div>
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-end"
            >
                <div className="text-3xl md:text-4xl font-black text-blue-600 tracking-tight">
                    {formatPrice(property.price)}
                </div>
                <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">Est. Payment</div>
            </motion.div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2 md:row-span-2 relative h-full group"
            >
                <img 
                    src={property.propertyImage[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            {property.propertyImage.slice(1, 5).map((img, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                    className="relative h-full overflow-hidden group"
                >
                    <img 
                        src={img} 
                        alt={`${property.title} ${index + 2}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex flex-col items-center justify-center text-center p-2">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
                            <Bed size={24} />
                        </div>
                        <span className="text-2xl font-black text-slate-900">{property.configuration}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Config</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-2">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
                            <Square size={24} />
                        </div>
                        <span className="text-2xl font-black text-slate-900">{property.sqFeet}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sq Ft</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-2">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
                            <Calendar size={24} />
                        </div>
                        <span className="text-2xl font-black text-slate-900">{property.yearBuilt}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Year Built</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-2">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
                            <Home size={24} />
                        </div>
                        <span className="text-2xl font-black text-slate-900">{property.propertyType}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Type</span>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-6">About this home</h3>
                    <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                        {property.description}
                    </p>
                </div>

                {/* Verify AI Analysis Section */}
                {/* AI Analysis Section */}
                <div className="min-h-[500px]">
                    {aiData ? (
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden transition-all duration-500 ease-in-out">
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="px-4 py-2 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20">
                                        <Sparkles size={18} className="text-white" />
                                        <span className="font-black text-sm uppercase tracking-widest">AI Market Analysis</span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12 mb-12">
                                    <div>
                                        <h4 className="text-2xl font-black mb-6 flex items-center gap-2">
                                            <TrendingUp className="text-emerald-400" />
                                            Investment Highlights
                                        </h4>
                                        <ul className="space-y-4">
                                            {aiData.highlights?.map((highlight, index) => (
                                                <li key={index} className="flex gap-4 items-start">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                                        <CheckCircle2 size={12} strokeWidth={4} />
                                                    </div>
                                                    <span className="text-slate-300 font-medium leading-relaxed">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black mb-6 flex items-center gap-2">
                                            <User className="text-blue-400" />
                                            Ideal For
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {aiData?.bestFor?.map((item, index) => (
                                                <span key={index} className="px-5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white uppercase tracking-wider backdrop-blur-md">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Price History Note</p>
                                            <p className="text-slate-300 font-medium italic">"{aiData.priceHistorySummary}"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-8">
                                    <h4 className="font-black text-xl mb-4 text-white">Generative Insight</h4>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        {aiData.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden h-full flex flex-col justify-center">
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none"></div>

                            {/* Blurred Placeholder Content */}
                            <div className="opacity-20 blur-sm select-none pointer-events-none absolute inset-0 p-8 md:p-12 overflow-hidden">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="px-4 py-2 bg-slate-800 rounded-xl w-48 h-10"></div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12 mb-12">
                                    <div className="space-y-6">
                                        <div className="h-8 bg-slate-700 rounded w-2/3"></div>
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-5 h-5 rounded-full bg-slate-800 shrink-0"></div>
                                                <div className="h-4 bg-slate-800 rounded w-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-6">
                                        <div className="h-8 bg-slate-700 rounded w-1/2"></div>
                                        <div className="flex gap-2 flex-wrap">
                                            {[1, 2, 3].map((i) => <div key={i} className="h-10 w-24 bg-slate-800 rounded-xl"></div>)}
                                        </div>
                                        <div className="h-32 bg-slate-800 rounded-2xl mt-8"></div>
                                    </div>
                                </div>
                                <div className="border-t border-white/10 pt-8">
                                    <div className="h-6 bg-slate-800 rounded w-1/3 mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                                        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                                        <div className="h-4 bg-slate-800 rounded w-4/5"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Overlay Interaction Layer */}
                            <div className="relative z-20 flex flex-col items-center justify-center text-center p-6">
                                {aiLoading ? (
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Sparkles size={20} className="text-emerald-500 animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-white">Analyzing Market Data</h3>
                                            <p className="text-slate-400">Our AI is generating comprehensive insights...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                            <Sparkles size={40} className="text-white" />
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-4">Unlock AI Insights</h3>
                                        <p className="text-slate-400 mb-8 max-w-md text-lg leading-relaxed">
                                            Get instant property valuation analysis, investment highlights, and rental potential estimates powered by advanced AI.
                                        </p>
                                        <button 
                                            onClick={handleVerifyAIAnalysis}
                                            className="group relative px-8 py-4 bg-white text-slate-900 rounded-xl font-black text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl shadow-white/10 flex items-center gap-3"
                                        >
                                            <Sparkles size={20} className="text-blue-600 group-hover:rotate-12 transition-transform" />
                                            Generate Analysis
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Amenities */}
                <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-8">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                        {property.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <CheckCircle2 size={20} />
                                </div>
                                <span className="font-bold text-slate-700 capitalize">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Right Column - Owner/Contact */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    {/* Owner Card */}
                    <div className="bg-white p-6 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden flex items-center justify-center text-slate-400">
                                <User size={32} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Listed By</p>
                                <h4 className="text-xl font-black text-slate-900">{property.owner.name}</h4>
                                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-1">
                                    <ShieldCheck size={14} />
                                    <span>Verified Seller</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                                    <p className="font-bold text-slate-900">{property.owner.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                                    <p className="font-bold text-slate-900 break-all">{property.owner.email}</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                            <DollarSign size={20} />
                            Make an Offer
                        </button>
                        <button className="w-full mt-3 py-4 bg-white text-blue-600 font-black rounded-xl border-2 border-blue-100 hover:bg-blue-50 transition-colors">
                            Schedule Tour
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-slate-900 p-6 rounded-4xl text-white">
                        <h4 className="font-black text-lg mb-6 flex items-center gap-2">
                            <TrendingUp className="text-emerald-400" />
                            Market Pulse
                        </h4>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                                    <span>Demand Score</span>
                                    <span className="text-emerald-400">High</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[85%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                                    <span>Price vs Market</span>
                                    <span className="text-blue-400">Fair Value</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[60%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default SingleProperty;
