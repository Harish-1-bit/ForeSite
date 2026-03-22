import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle2,
  Building2,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createEnquiry } from "../../features/customer/CustomerSlice";
import { toast } from "sonner";

const EnquiryModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    enquiryType: "Property Inquiry",
    message: "",
  });

  const { enquirySubmitting } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);

  // Prefill user data if available
  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // As per user request: only store the actual message in the message section
    // We can use the metadata for the email/internal tracking if needed, 
    // but the 'message' field in DB should be clean.
    const resultAction = await dispatch(
      createEnquiry({
        property: property._id,
        message: formData.message,
      })
    );

    if (createEnquiry.fulfilled.match(resultAction)) {
      setIsSuccess(true);
      toast.success("Enquiry submitted successfully!");
    } else {
      toast.error(resultAction.payload || "Failed to submit enquiry");
    }
  };

  const enquiryTypes = [
    { id: "Property Inquiry", icon: MessageSquare },
    { id: "Schedule a Site Visit", icon: Calendar },
    { id: "Pricing Details", icon: Sparkles },
    { id: "Callback Request", icon: Phone },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {isSuccess ? (
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600"
              >
                <CheckCircle2 size={40} strokeWidth={2.5} />
              </motion.div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Enquiry Sent!
              </h3>
              <p className="text-slate-500 mb-8 font-medium">
                The property owner will be notified of your interest. You can
                track the status in your dashboard.
              </p>
              <button
                onClick={onClose}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black tracking-tight hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Back to Property
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="relative h-32 bg-linear-to-br from-indigo-600 to-blue-500 p-8 flex items-end">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                    Property Inquiry
                  </h2>
                  <p className="text-white/80 text-sm mt-2 font-medium flex items-center gap-1.5">
                    <Building2 size={14} /> {property?.title}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Enquiry Type Chips */}
                <div className="space-y-3 font-semibold">
                  <label className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-black">
                    What are you looking for?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {enquiryTypes.map((type) => {
                      const Icon = type.icon;
                      const active = formData.enquiryType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, enquiryType: type.id })
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            active
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                              : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200"
                          }`}
                        >
                          <Icon size={14} />
                          {type.id}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-semibold">
                    <label className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-black px-1">
                      Visit Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 text-slate-300" size={18} />
                      <input
                        type="text"
                        placeholder="e.g. Flexible"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-bold placeholder:text-slate-300"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 font-semibold">
                    <label className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-black px-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 text-slate-300" size={18} />
                      <input
                        type="tel"
                        placeholder="Country code + Number"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-bold placeholder:text-slate-300"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-black px-1 font-semibold">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ask about pricing, availability, or property details..."
                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-bold placeholder:text-slate-300"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={enquirySubmitting}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black tracking-tight hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-wait"
                >
                  {enquirySubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryModal;
