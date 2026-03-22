import React from "react";
import {
  Building2,
  BrainCircuit,
  LineChart,
  ShieldCheck,
  BellRing,
  Users,
  ArrowRight,
  Home,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Insights",
      description:
        "Leverage advanced AI point-of-view analysis to calculate potential returns, assess risks, and deeply understand your next property investment.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      icon: <LineChart className="w-8 h-8 text-emerald-600" />,
      title: "Smart ROI Calculator",
      description:
        "Project future valuations, calculate annualized returns, and evaluate cash-on-cash metrics with our data-driven financial modeling.",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
    {
      icon: <Building2 className="w-8 h-8 text-violet-600" />,
      title: "Comprehensive Listings",
      description:
        "Discover a curated portfolio of premium commercial and residential properties, complete with rich media and verified details.",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-100",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
      title: "Role-Based Security",
      description:
        "Enterprise-grade security with tailored access controls for Admins, Managers, Employees, and Users to ensure data integrity.",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      icon: <BellRing className="w-8 h-8 text-rose-600" />,
      title: "Real-time Notifications",
      description:
        "Stay ahead of the market with instant alerts on status updates, new property inquiries, and portfolio changes.",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Seamless Collaboration",
      description:
        "Bridge the gap between buyers and sellers with our integrated inquiry management and communication tools.",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-multiply opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[100px] mix-blend-multiply opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md border border-white/10">
            <Home className="w-4 h-4" />
            <span>Welcome to ForeSite</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Pioneering the Future of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Real Estate
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-10 font-medium">
            ForeSite empowers investors, buyers, and sellers with unparalleled
            AI-driven analytics, ensuring every real estate decision is backed
            by intelligent data, deep market insights, and comprehensive
            financial clarity.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex justify-center gap-4">
            <Link
              to="/all-properties"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-xl transition duration-200 shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              Explore Properties
            </Link>
            <Link
              to="/roi-calculator"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-10 rounded-xl transition duration-200 border border-white/10 active:scale-95"
            >
              ROI Calculator
            </Link>
          </motion.div>
        </div>

        {/* Soft bottom edge transition */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10"></div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-linear-to-tr from-indigo-100 to-blue-50 rounded-[3rem] transform -rotate-3 z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
                alt="Modern Real Estate"
                className="relative z-10 w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
              />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <TrendingUp className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-widest mb-1">
                      Data Accuracy
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      99.9%
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Intelligence meets <br />
                <span className="text-indigo-600">infrastructure.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
                Traditional real estate relies heavily on guesswork and
                intuition. ForeSite transforms the paradigm by bringing
                institutional-grade analytics to everyday investors and
                homebuyers.
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                Our platform aggregates countless data points, leveraging custom
                Language Models to interpret nuances in property conditions,
                neighborhood trajectories, and historical pricing to deliver
                actionable intelligence.
              </p>

              <ul className="space-y-5">
                {[
                  "Eliminate emotional investing with objective ROI projections.",
                  "Streamline communication between buyers, sellers, and agents.",
                  "Reduce due diligence time from weeks to minutes.",
                ].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-slate-700 font-bold text-lg leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Everything you need to scale your portfolio.
            </h2>
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              We've engineered a comprehensive suite of tools designed to cover
              the entire lifecycle of real estate investment and management.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                variants={itemVariants}
                key={idx}
                className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${feature.bgColor} ${feature.borderColor} group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-600 group-hover:text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-900/20">
            {/* abstract circles */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[30rem] h-[30rem] bg-indigo-600/30 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-tight">
                Ready to transform your <br/>investments?
              </h2>
              <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Join thousands of modern investors leveraging AI to build
                smarter, more profitable real estate portfolios.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-black py-5 px-12 rounded-2xl hover:bg-slate-50 transition duration-200 hover:scale-105 active:scale-95 shadow-xl group"
              >
                Create Your Free Account
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
