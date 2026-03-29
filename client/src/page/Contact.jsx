import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/soniharish029@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <NavBar />

      {/* Decorative Header */}
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 via-slate-900 to-slate-900/80"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md border border-white/10">
            <MessageSquare className="w-4 h-4" />
            <span>We're Here to Help</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-medium">
            Have questions about a property, our AI insights, or your investment
            portfolio? Our team of real estate professionals is ready to assist
            you.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information Sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                Contact Information
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium text-sm">
                Fill out the form and our team will get back to you within 24
                hours. We're looking forward to analyzing your next opportunity.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Phone
                    </h4>
                    <p className="text-slate-600 font-medium">+910000000000</p>
                    <p className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-wider">
                      Mon-Fri, 9am to 6pm IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Email directly
                    </h4>
                    <p className="text-slate-600 font-medium break-all">soniharish029@gmail.com</p>
                    <p className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-wider">
                      We aim to reply in 24 hrs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Headquarters
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Scheme 78
                      <br />
                      Indore, Madhya Pradesh
                      <br />
                      India 452010
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft decorative element below sidebar */}
            <div className="hidden lg:block bg-linear-to-br from-indigo-600 to-blue-500 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-600/20 overflow-hidden relative">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 blur-2xl rounded-full"></div>
              <h4 className="font-black text-xl mb-2 relative z-10 tracking-tight">
                Looking for support?
              </h4>
              <p className="text-blue-50 text-sm leading-relaxed mb-4 relative z-10 font-medium">
                Are you an existing customer having trouble? Log in to your
                dashboard to access our priority ticket system.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              {/* Decorative background blur inside form */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-[30rem] h-[30rem] rounded-full bg-blue-50/50 blur-[80px] pointer-events-none"></div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 relative z-10 tracking-tight">
                Send us a message
              </h2>
              <p className="text-slate-500 mb-10 max-w-xl relative z-10 font-medium text-lg">
                Whether you're looking to buy, sell, or receive unparalleled
                AI-driven insights on a property, drop us a line.
              </p>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 mr-4 shrink-0" />
                  <div>
                    <h3 className="text-emerald-800 font-bold text-lg mb-1">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-emerald-700 font-medium">
                      Thank you for reaching out. We have received your inquiry
                      and will be in touch shortly.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 mr-4 shrink-0" />
                  <div>
                    <h3 className="text-red-800 font-bold text-lg mb-1">
                      Something went wrong
                    </h3>
                    <p className="text-red-700 font-medium">
                      We couldn't process your message right now. Please try
                      emailing us directly at soniharish029@gmail.com.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* FormSubmit Configuration Fields */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Inquiry from ForeSite Website"
                />
                <input type="hidden" name="_template" value="box" />
                {/* Honey pot to prevent spam */}
                <input type="text" name="_honey" style={{ display: "none" }} />

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="First Name"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all hover:bg-slate-100/50"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="Last Name"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all hover:bg-slate-100/50"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all hover:bg-slate-100/50"
                      placeholder="yourname@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Phone Number <span className="text-slate-300 normal-case font-medium ml-1">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all hover:bg-slate-100/50"
                      placeholder="+91 ____ _____"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all hover:bg-slate-100/50 resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 text-white font-black py-5 px-10 rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
