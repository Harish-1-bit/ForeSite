import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesCustomer } from "../features/customer/CustomerSlice";
import { LoaderScreen } from "../components/LoaderScreen";
import { toast } from "sonner";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Building2,
  Grid2X2,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

export function AllProperties() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    allPropertyCustomer,
    customerLoading,
    customerError,
    customerMessage,
  } = useSelector((state) => state.customer);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProperties = (allPropertyCustomer || []).filter((property) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      property.title?.toLowerCase().includes(searchLower) ||
      property.address?.toLowerCase().includes(searchLower) ||
      property.city?.toLowerCase().includes(searchLower)
    );
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    dispatch(getPropertiesCustomer());
    if (customerError && customerMessage) {
      toast.error(customerMessage);
    }
  }, [dispatch, customerError, customerMessage]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  if (customerLoading) {
    return <LoaderScreen />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <NavBar />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-200 h-200 bg-indigo-600/5 rounded-full blur-[100px]"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-160 h-160 bg-blue-600/5 rounded-full blur-[100px]"
        ></motion.div>
      </div>

      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
                Discover Properties
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-2xl">
                Explore our curated selection of premium real estate
                opportunities tailored for your portfolio.
              </p>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by title, address, or city..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 rounded-xl font-medium text-slate-900 placeholder-slate-400 transition-all outline-none"
              />
            </div>

            <div className="flex gap-2 sm:shrink-0 bg-slate-50 p-1 rounded-xl items-center">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${viewMode === "grid" ? "bg-white text-indigo-600 shadow-sm font-bold" : "text-slate-500 hover:text-slate-900"}`}
                aria-label="Grid View"
              >
                <Grid2X2 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${viewMode === "list" ? "bg-white text-indigo-600 shadow-sm font-bold" : "text-slate-500 hover:text-slate-900"}`}
                aria-label="List View"
              >
                <LayoutList size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
          <span>
            Showing {paginatedProperties.length} of {filteredProperties.length}{" "}
            Properties
          </span>
        </div>

        {/* Properties Grid/List */}
        <AnimatePresence mode="wait">
          {paginatedProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                No properties found
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Try adjusting your search query or removing filters to find what
                you're looking for.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 px-6 py-2.5 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  : "flex flex-col gap-4"
              }
            >
              {paginatedProperties.map((property) => (
                <motion.div
                  variants={itemVariants}
                  key={property._id}
                  onClick={() => navigate(`/property/${property._id}`)}
                  className={`group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 cursor-pointer ${viewMode === "list" ? "flex flex-col sm:flex-row h-auto sm:h-56" : "flex flex-col"}`}
                >
                  {/* Image Container */}
                  <div
                    className={`relative overflow-hidden bg-slate-100 ${viewMode === "list" ? "w-full sm:w-2/5 h-48 sm:h-full shrink-0" : "w-full aspect-[4/3]"}`}
                  >
                    <img
                      src={
                        property.propertyImage?.[0] ||
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000"
                      }
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {property.isActive ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-emerald-500/20 backdrop-blur-md">
                          <CheckCircle2 size={12} strokeWidth={3} /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-md">
                          <Clock size={12} strokeWidth={3} /> Off Market
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div
                    className={`p-6 flex flex-col justify-between ${viewMode === "list" ? "w-full sm:w-3/5" : "grow"}`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[0.65rem] font-black uppercase tracking-widest rounded-md">
                          {property.propertyType || "Property"}
                        </span>
                      </div>
                      <h3 className="font-black text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-baseline gap-1.5 text-slate-500 mb-4">
                        <MapPin size={16} className="text-slate-400 shrink-0" />
                        <p className="text-sm font-medium line-clamp-1">
                          {property.address}, {property.city}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="w-full h-px bg-slate-100 mb-4"></div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Listed Price
                          </p>
                          <span className="text-2xl font-black text-slate-900 tracking-tight">
                            {formatPrice(property.price)}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-slate-600">
                          <div className="flex flex-col items-end">
                            <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Area
                            </span>
                            <div className="flex items-center gap-1.5 font-bold">
                              <Building2 size={16} className="text-slate-400" />
                              <span>
                                {property.sqFeet}{" "}
                                <span className="text-xs font-medium text-slate-400">
                                  sqft
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className="hidden sm:flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-110"
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
