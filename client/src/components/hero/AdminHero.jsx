import React from "react";
import { motion } from "framer-motion";

import {
  BarChart3,
  Activity,
  ShieldCheck,
  Users,
  Cpu,
  Verified,
} from "lucide-react";

const AdminHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900 antialiased pt-20 overflow-hidden selection:bg-indigo-200 selection:text-indigo-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none opacity-40">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-indigo-500/5 rounded-full blur-[100px]"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-indigo-300/10 rounded-full blur-[80px]"
          />
        </div>

        {/* Content Canvas */}
        <motion.div
          className="max-w-4xl mx-auto mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 mb-8"
          >
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">
              System Status: Optimal
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
          >
            Your Intelligent{" "}
            <span className="text-indigo-600">Command Center</span> for Real
            Estate Oversight.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Streamline operations, manage property approvals, and monitor
            system-wide AI engine health from a single, high-performance
            interface.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <button className="bg-linear-to-r from-indigo-600 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-tight w-full sm:w-auto hover:-translate-y-0.5 transition-all shadow-xl shadow-indigo-500/25">
              Launch Command Center
            </button>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-sm tracking-tight w-full sm:w-auto border border-slate-200 hover:bg-slate-50 transition-colors hover:-translate-y-0.5 shadow-sm">
              System Health Report
            </button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview / Abstract Engine Visual */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-20 sm:mt-24 w-full max-w-6xl mx-auto px-4 perspective-[1000px]"
        >
          <div className="bg-white rounded-2xl p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 transform hover:rotate-x-2 transition-transform duration-700">
            <div className="grid grid-cols-12 gap-6 p-6 bg-slate-50 rounded-xl">
              {/* Simulated Bento Elements */}
              <div className="col-span-12 lg:col-span-7 bg-white rounded-xl p-8 h-88 relative overflow-hidden shadow-sm border border-slate-100 group">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Engine Performance
                    </h3>
                    <div className="text-4xl font-black text-slate-900 mt-2">
                      99.82%
                    </div>
                  </div>
                  <BarChart3 className="text-indigo-500 w-6 h-6" />
                </div>

                {/* Abstract Data Visualization */}
                <div className="absolute bottom-0 left-0 w-full h-48 opacity-60 mix-blend-multiply group-hover:opacity-100 transition-opacity duration-700">
                  <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    className="w-full h-full text-indigo-500/20 fill-current"
                  >
                    <path d="M0,150 L0,80 Q50,90 100,50 T200,60 T300,30 T400,80 T500,40 L500,150 Z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 w-full h-full text-indigo-500/40 fill-current"
                  >
                    <path d="M0,150 L0,100 Q80,120 150,60 T250,70 T350,40 T450,100 T500,60 L500,150 Z"></path>
                  </svg>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                    className="absolute bottom-0 w-full h-full text-indigo-600/60 fill-current origin-left"
                  >
                    <svg
                      viewBox="0 0 500 150"
                      preserveAspectRatio="none"
                      className="w-full h-full"
                    >
                      <path d="M0,150 L0,110 Q100,130 180,80 T280,90 T380,50 T480,120 T500,80 L500,150 Z"></path>
                    </svg>
                  </motion.div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                <div className="flex-1 bg-white rounded-xl p-8 flex items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Pending Approvals
                    </h3>
                    <div className="text-4xl font-black text-slate-900 mt-2">
                      14
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Verified className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-xl p-8 flex items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Active Agents
                    </h3>
                    <div className="text-4xl font-black text-slate-900 mt-2">
                      1,204
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Functional Pillars */}
      <section className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16"
        >
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Algorithmic Precision
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Our AI engine processes thousands of listing parameters per second
              to ensure data integrity across your entire portfolio.
            </p>
          </div>

          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Governance First
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Sophisticated permission layers and automated approval workflows
              that adapt to your organizational structure.
            </p>
          </div>

          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Real-Time Insight
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Live telemetry dashboards provide a macroscopic view of system
              health and regional market movements.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AdminHero;
