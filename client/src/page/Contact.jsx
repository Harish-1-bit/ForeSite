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
      // Using FormSubmit.co for free, no-backend email forwarding via AJAX
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
      <NavBar />

      {/* Decorative Header */}
      <div className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md border border-white/10">
            <MessageSquare className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300">
            Have questions about a property, our AI insights, or your investment
            portfolio? Our team of real estate professionals is ready to assist
            you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Fill out the form and our team will get back to you within 24
                hours. We're looking forward to analyzing your next opportunity.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Phone
                    </h4>
                    <p className="text-slate-600">+910000000000</p>
                    <p className="text-slate-500 text-sm mt-0.5">
                      Mon-Fri, 9am to 6pm IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Email directly
                    </h4>
                    <p className="text-slate-600">soniharish029@gmail.com</p>
                    <p className="text-slate-500 text-sm mt-0.5">
                      We aim to reply in 24 hrs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center shrink-0 border border-violet-100">
                    <MapPin className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Headquarters
                    </h4>
                    <p className="text-slate-600">
                      Scheme 78
                      <br />
                      Indore, Madhya Pradesh 452010
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft decorative element below sidebar */}
            <div className="hidden lg:block bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 blur-2xl rounded-full"></div>
              <h4 className="font-bold text-lg mb-2 relative z-10">
                Looking for support?
              </h4>
              <p className="text-blue-50 text-sm leading-relaxed mb-4 relative z-10">
                Are you an existing customer having trouble? Log in to your
                dashboard to access our priority ticket system.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              {/* Decorative background blur inside form */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-50 blur-3xl opacity-50 pointer-events-none"></div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2 relative z-10">
                Send us a message
              </h2>
              <p className="text-slate-600 mb-8 max-w-lg relative z-10">
                Whether you're looking to buy, sell, or receive unparalleled
                AI-driven insights on a property, drop us a line.
              </p>

              {status === "success" && (
                <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start animate-in slide-in-from-top-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="text-emerald-800 font-bold">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-emerald-700 text-sm mt-1">
                      Thank you for reaching out. We have received your inquiry
                      and will be in touch shortly.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start animate-in slide-in-from-top-4">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="text-red-800 font-bold">
                      Something went wrong
                    </h3>
                    <p className="text-red-700 text-sm mt-1">
                      We couldn't process your message right now. Please try
                      emailing us directly at soniharish029@gmail.com.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* FormSubmit Configuration Fields */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Inquiry from ForeSite Website"
                />
                <input type="hidden" name="_template" value="box" />
                {/* Honey pot to prevent spam */}
                <input type="text" name="_honey" style={{ display: "none" }} />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="First Name"
                      required
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="Last Name"
                      required
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                      placeholder="+91 ____ _____"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-semibold py-3.5 px-8 rounded-xl transition duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
