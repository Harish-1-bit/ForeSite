import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProperty, aiResponse, resetAiResponse } from "../features/customer/CustomerSlice.js";
import NavBar from "../components/NavBar.jsx";
import {
  MapPin, Bed, Bath, Square, Calendar, CheckCircle2, User, Phone, Mail,
  TrendingUp, ShieldCheck, Sparkles, Home, IndianRupee, ArrowLeft, ArrowUpRight,
  X, ChevronLeft, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { LoaderScreen } from "../components/LoaderScreen.jsx";
import { Toaster, toast } from "sonner";
import EnquiryModal from "../components/customer/EnquiryModal.jsx";


const SingleProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);


  const {
    singleProperty,
    aiResponse: aiData,
    customerLoading,
    customerError,
    customerMessage,
    aiLoading,
  } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);

  const handleVerifyAIAnalysis = useCallback(() => {
    dispatch(aiResponse(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(resetAiResponse());
      dispatch(getSingleProperty(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (customerError && customerMessage) {
      toast.error(customerMessage);
    }
  }, [customerError, customerMessage]);

  if (customerLoading) {
    return <LoaderScreen />;
  }

  if (customerError) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md w-full p-8 md:p-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Access Denied</h2>
            <p className="text-slate-500 mb-8 font-medium leading-relaxed">
              {customerMessage || "We couldn't load the details for this property. It may have been removed or you don't have access."}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Return to Listings
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!singleProperty) return null;

  const { property } = singleProperty;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const openGallery = (index) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setTimeout(() => setSelectedImageIndex(null), 300);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const images = property?.propertyImage?.length > 0 
    ? property.propertyImage 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000'];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans flex flex-col relative overflow-hidden">
      <NavBar />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-240 h-240 bg-indigo-600/5 rounded-full blur-[120px] mix-blend-multiply"></div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
        {/* Back Button */}
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors w-max">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all border border-slate-100 group-hover:border-indigo-100">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Back to Properties</span>
        </motion.button>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-[0.65rem] font-black uppercase tracking-widest border border-indigo-100">
                {property.propertyType}
              </span>
              {property.isActive && (
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[0.65rem] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                  <CheckCircle2 size={12} strokeWidth={3} /> Active Listing
                </span>
              )}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-none">
              {property.title}
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2.5 text-slate-500 font-medium text-lg">
              <MapPin size={20} className="text-indigo-500 shrink-0" />
              <span>{property.address}, {property.city}, {property.state} {property.zipcode}</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-start lg:items-end bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 w-full lg:w-auto">
            <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Listed Price</div>
            <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              {formatPrice(property.price)}
            </div>
          </motion.div>
        </div>

        {/* Image Display */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
          {images.length >= 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[60vh] min-h-[400px] max-h-[600px] rounded-4xl overflow-hidden shadow-2xl shadow-indigo-900/10 border-4 border-white bg-slate-100">
              <div onClick={() => openGallery(0)} className="md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
                 <img src={images[0]} alt="Primary View" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div onClick={() => openGallery(1)} className="relative group cursor-pointer overflow-hidden hidden md:block">
                 <img src={images[1]} alt="View 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div onClick={() => openGallery(2)} className="relative group cursor-pointer overflow-hidden hidden md:block">
                 <img src={images[2]} alt="View 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div onClick={() => images[3] && openGallery(3)} className="relative group cursor-pointer overflow-hidden hidden md:block">
                 {images[3] ? (
                   <>
                     <img src={images[3]} alt="View 4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                   </>
                 ) : (
                   <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                 )}
              </div>
              <div onClick={() => images[4] && openGallery(4)} className="relative group cursor-pointer overflow-hidden hidden md:block">
                 {images[4] ? (
                   <>
                     <img src={images[4]} alt="View 5" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                     {images.length > 5 && (
                       <div onClick={(e) => { e.stopPropagation(); openGallery(5); }} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-slate-900/40 transition-colors duration-500">
                         <span className="text-white font-black tracking-widest text-lg">+{images.length - 5} More</span>
                       </div>
                     )}
                   </>
                 ) : (
                   images[3] ? (
                     <div className="w-full h-full bg-linear-to-br from-indigo-50 to-slate-100 flex items-center justify-center">
                        <Sparkles className="text-indigo-200 w-8 h-8" />
                     </div>
                   ) : (
                     <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                   )
                 )}
              </div>
            </div>
          ) : images.length === 2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh] min-h-[400px] max-h-[600px] rounded-4xl overflow-hidden shadow-2xl shadow-indigo-900/10 border-4 border-white bg-slate-100">
              <div onClick={() => openGallery(0)} className="relative group cursor-pointer overflow-hidden">
                 <img src={images[0]} alt="Primary View" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div onClick={() => openGallery(1)} className="relative group cursor-pointer overflow-hidden hidden md:block">
                 <img src={images[1]} alt="Secondary View" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
          ) : (
            <div onClick={() => openGallery(0)} className="w-full h-[60vh] min-h-[400px] max-h-[600px] rounded-4xl overflow-hidden relative group shadow-2xl shadow-indigo-900/10 border-4 border-white cursor-pointer">
               <img src={images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Key Features */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-all hover:border-indigo-100">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Bed size={24} />
                </div>
                <span className="text-2xl font-black text-slate-900">{property.configuration || '3 Bed'}</span>
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Config</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-all hover:border-indigo-100">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Square size={24} />
                </div>
                <span className="text-2xl font-black text-slate-900">{property.sqFeet}</span>
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Sq Ft</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-all hover:border-indigo-100">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Calendar size={24} />
                </div>
                <span className="text-2xl font-black text-slate-900">{property.yearBuilt || '2022'}</span>
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Year Built</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-all hover:border-indigo-100">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Home size={24} />
                </div>
                <span className="text-lg font-black text-slate-900 line-clamp-1 break-all">{property.propertyType}</span>
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Type</span>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">About this home</h3>
              <div className="prose prose-lg text-slate-600 font-medium leading-relaxed max-w-none">
                <p className="whitespace-pre-line">{property.description}</p>
              </div>
            </motion.div>

            {/* AI Analysis Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="min-h-[500px]">
              {aiData ? (
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden transition-all duration-500 shadow-2xl shadow-indigo-900/20">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                      <div className="px-5 py-2.5 bg-linear-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                        <Sparkles size={18} className="text-white" />
                        <span className="font-black text-sm uppercase tracking-widest">AI Market Analysis</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                      <div>
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-2 text-white">
                          <TrendingUp className="text-emerald-400" /> Investment Highlights
                        </h4>
                        <ul className="space-y-4">
                          {aiData.highlights?.map((highlight, index) => (
                            <li key={index} className="flex gap-4 items-start">
                              <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <CheckCircle2 size={14} strokeWidth={3} />
                              </div>
                              <span className="text-slate-300 font-medium leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-2 text-white">
                          <User className="text-indigo-400" /> Ideal For
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {aiData?.bestFor?.map((item, index) => (
                            <span key={index} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white tracking-wide backdrop-blur-md">
                              {item}
                            </span>
                          ))}
                        </div>
                        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Price History Note</p>
                          <p className="text-slate-300 font-medium italic">"{aiData.priceHistorySummary}"</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 mt-10">
                      <h4 className="font-black text-2xl mb-4 text-white">Generative Insight</h4>
                      <p className="text-slate-300 leading-relaxed text-lg">{aiData.description}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden min-h-[500px] flex flex-col justify-center shadow-2xl shadow-indigo-900/20">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none"></div>

                  {/* Blurred Placeholder Concept */}
                  <div className="opacity-10 blur-sm select-none pointer-events-none absolute inset-0 p-8 md:p-12 overflow-hidden flex flex-col justify-between">
                     <div className="w-48 h-10 bg-slate-800 rounded-xl mb-8"></div>
                     <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-4">
                           <div className="w-3/4 h-8 bg-slate-800 rounded-lg"></div>
                           <div className="w-full h-4 bg-slate-800 rounded-lg"></div>
                           <div className="w-full h-4 bg-slate-800 rounded-lg"></div>
                           <div className="w-4/5 h-4 bg-slate-800 rounded-lg"></div>
                        </div>
                        <div className="space-y-4">
                           <div className="w-1/2 h-8 bg-slate-800 rounded-lg"></div>
                           <div className="flex gap-2"><div className="w-24 h-10 bg-slate-800 rounded-xl"></div><div className="w-32 h-10 bg-slate-800 rounded-xl"></div></div>
                        </div>
                     </div>
                  </div>

                  <div className="relative z-20 flex flex-col items-center justify-center text-center">
                    {aiLoading ? (
                      <div className="flex flex-col items-center gap-8">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles size={24} className="text-indigo-400 animate-pulse" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-3xl font-black text-white tracking-tight">Analyzing Market Data</h3>
                          <p className="text-slate-400 text-lg">Synthesizing comprehensive investment insights...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="w-24 h-24 bg-linear-to-br from-indigo-500 to-blue-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/30">
                          <Sparkles size={48} className="text-white" />
                        </motion.div>
                        <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Unlock AI Insights</h3>
                        <p className="text-slate-400 mb-10 max-w-lg text-lg leading-relaxed mx-auto font-medium">
                          Deploy advanced AI models to instantly extract property valuation analysis, investment highlights, and core demographic compatibility.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={handleVerifyAIAnalysis}
                          className="group px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl shadow-white/5 flex items-center gap-3"
                        >
                          <Sparkles size={24} className="text-indigo-600 group-hover:rotate-12 transition-transform" />
                          Generate Insight Report
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Amenities */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(property.amenities || ['Central AC', 'Hardwood Floors', 'Garage', 'Smart Thermostat', 'Pool']).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-bold text-slate-700 capitalize line-clamp-2">{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactions/Sticky Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Owner/Contact Card */}
              <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shrink-0">
                    <User size={32} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Listed Agent</p>
                    <h4 className="text-xl font-black text-slate-900 truncate">{property.owner?.name || "ForeSite Agent"}</h4>
                    <div className="flex items-center gap-1.5 text-emerald-600 text-[0.65rem] font-black uppercase tracking-widest mt-1.5 bg-emerald-50 w-max px-2 py-1 rounded-md">
                      <ShieldCheck size={14} strokeWidth={3} /> Verified Seller
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-4 p-4 lg:p-3 xl:p-4 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                      <p className="font-bold text-slate-900 truncate">{property.owner?.phone || "+1 555-0100"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 lg:p-3 xl:p-4 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                      <p className="font-bold text-slate-900 truncate">{property.owner?.email || "agent@foresite.com"}</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (user) {
                      setIsEnquiryOpen(true);
                    } else {
                      toast.error("please login for making enquerry");
                      setTimeout(() => navigate("/login"), 1500);
                    }
                  }}
                  className="w-full py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                >
                  <IndianRupee size={20} /> Submit Enquiry
                </motion.button>
              </div>

              {/* Quick Market Stats */}
              <div className="bg-slate-900 p-8 rounded-4xl text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full"></div>
                
                <h4 className="font-black text-xl mb-8 flex items-center gap-3 z-10 relative">
                  <TrendingUp className="text-indigo-400" /> Market Pulse
                </h4>
                
                <div className="space-y-8 z-10 relative">
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest">
                      <span>Demand Score</span>
                      <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">High</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-linear-to-r from-emerald-500 to-emerald-400"></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest">
                      <span>Price vs Market</span>
                      <span className="text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">Fair Value</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="h-full bg-linear-to-r from-indigo-500 to-blue-400"></motion.div>
                    </div>
                  </div>
                </div>

                <button onClick={() => navigate('/roi-calculator')} className="mt-8 w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2 text-sm border border-white/5 active:scale-95">
                  Open ROI Calculator <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        property={property}
      />

      {/* Lightbox / Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
          <button onClick={closeGallery} className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-50 shadow-lg">
            <X size={24} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12" onClick={closeGallery}>
            {images.length > 1 && (
              <button onClick={prevImage} className="absolute left-4 sm:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-50 shadow-lg group">
                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            
            <motion.div 
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative max-w-7xl max-h-full aspect-video md:aspect-auto md:h-[85vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={images[selectedImageIndex]} alt={`Gallery view ${selectedImageIndex + 1}`} className="w-full h-full object-contain bg-black/50" />
            </motion.div>

            {images.length > 1 && (
              <button onClick={nextImage} className="absolute right-4 sm:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-50 shadow-lg group">
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-white/90 font-bold tracking-widest text-sm shadow-xl ring-1 ring-white/20 pointer-events-none">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProperty;
