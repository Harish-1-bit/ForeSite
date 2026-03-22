import React, { useEffect } from "react";
import CustomerSidebar from "../../components/customer/CustomerSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Shield,
  Building2,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { getMyEnquiries } from "../../features/customer/CustomerSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LoaderScreen } from "../../components/LoaderScreen";

const StatusBadge = ({ status }) => {
  const configs = {
    pending: {
      icon: AlertCircle,
      label: "Pending",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    responded: {
      icon: CheckCircle2,
      label: "Responded",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    closed: {
      icon: XCircle,
      label: "Closed",
      className: "bg-slate-100 text-slate-600 border-slate-200",
    },
  };
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${config.className}`}
    >
      <Icon size={12} strokeWidth={2.5} />
      {config.label}
    </span>
  );
};

export default function CustomerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const { myEnquiries, enquiriesLoading } = useSelector(
    (state) => state.customer,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyEnquiries());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  return (
    <div className="flex shrink-0 h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <CustomerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 overflow-auto relative flex flex-col h-full">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm shrink-0">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  My Dashboard
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5 hidden sm:block">
                  Your profile &amp; property queries
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-black text-slate-900 leading-none">
                  {user?.name}
                </div>
                <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Customer Account
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 max-w-5xl mx-auto space-y-8 w-full">
          {/* ── Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 py-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-200 shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {user?.name || "Customer"}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-[0.65rem] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                      <Shield size={10} strokeWidth={3} /> Verified Customer
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                      <User size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">
                        Full Name
                      </p>
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {user?.name || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">
                        Email
                      </p>
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {user?.email || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                      <Phone size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">
                        Phone
                      </p>
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── My Queries ── */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <MessageSquare className="text-indigo-500 w-5 h-5" />
                  My Property Queries
                </h2>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  {myEnquiries?.length || 0}{" "}
                  {myEnquiries?.length === 1 ? "query" : "queries"} submitted
                </p>
              </div>
              <button
                onClick={() => navigate("/all-properties")}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors border border-indigo-100"
              >
                Browse Properties
              </button>
            </div>

            {enquiriesLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin" />
              </div>
            ) : !myEnquiries || myEnquiries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 border-dashed shadow-sm"
              >
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <MessageSquare className="w-8 h-8 text-indigo-300" />
                </div>
                <p className="text-lg font-black text-slate-900 mb-2">
                  No queries yet
                </p>
                <p className="text-sm font-medium text-slate-400 max-w-xs">
                  When you enquire about a property, your messages and their
                  status will appear here.
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {myEnquiries.map((enquiry) => (
                  <motion.div
                    key={enquiry._id}
                    variants={itemVariants}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-indigo-900/5 transition-all duration-300 overflow-hidden group"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Property Thumbnail */}
                      <div
                        className="sm:w-44 h-32 sm:h-auto bg-slate-100 shrink-0 overflow-hidden cursor-pointer"
                        onClick={() =>
                          enquiry.property?._id &&
                          navigate(`/property/${enquiry.property._id}`)
                        }
                      >
                        {enquiry.property?.propertyImage?.[0] ? (
                          <img
                            src={enquiry.property.propertyImage[0]}
                            alt={enquiry.property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Building2 className="w-10 h-10" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              enquiry.property?._id &&
                              navigate(`/property/${enquiry.property._id}`)
                            }
                          >
                            <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                              {enquiry.property?.title || "Property"}
                            </h3>
                            {(enquiry.property?.city ||
                              enquiry.property?.state) && (
                              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium mt-1">
                                <MapPin size={12} />
                                {[enquiry.property.city, enquiry.property.state]
                                  .filter(Boolean)
                                  .join(", ")}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <StatusBadge status={enquiry.status} />
                          </div>
                        </div>

                        {/* Query message */}
                        <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 border border-slate-100 flex gap-3 items-start">
                          <MessageSquare
                            size={14}
                            className="text-slate-400 mt-0.5 shrink-0"
                          />
                          <p className="leading-relaxed line-clamp-3">
                            {enquiry.message}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 font-medium">
                          <Clock size={12} />
                          <span>
                            Submitted{" "}
                            {enquiry.createdAt
                              ? new Date(enquiry.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "Recently"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
