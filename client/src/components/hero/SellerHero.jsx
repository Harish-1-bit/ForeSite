import React from "react";
import { motion } from "framer-motion";

import {
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
} from "lucide-react";

const SellerHero = () => {
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
    <div className="bg-slate-50 font-sans text-slate-900 antialiased overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          {/* Content Side */}
          <motion.div
            className="z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[0.7rem] uppercase tracking-widest font-extrabold rounded-full mb-6"
            >
              Intelligence Platform
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-[3.5rem] md:text-[4rem] leading-[1.1] font-extrabold tracking-tight text-slate-900 mb-8"
            >
              Maximize Your Property’s{" "}
              <span className="text-indigo-600 block sm:inline">
                Potential with AI.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg"
            >
              List your property on ForeSite and leverage real-time market
              intelligence and predictive ROI analytics to ensure you get the
              best value.
            </motion.p>

            

            {/* Stats / Social Proof */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex items-center gap-8"
            >
              <div>
                <p className="text-3xl font-black text-slate-900">98.4%</p>
                <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-bold mt-1">
                  Accuracy Rate
                </p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <p className="text-3xl font-black text-slate-900">₹2.4B</p>
                <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-bold mt-1">
                  Volume Managed
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Side (Asymmetric Layout) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative h-full flex justify-center items-center mt-12 lg:mt-0"
          >
            {/* Main Interior Image */}
            <div className="relative w-[70%] aspect-4/5 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                alt="Luxury minimalist living room interior"
                className="w-full h-full object-cover scale-100 group-hover:scale-100 transition-transform duration-700"
                src="/assets/seller_hero_image.png"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent"></div>
            </div>

            {/* Dashboard Overlay Snippet (Glassmorphism) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-8 -left-4 sm:-left-12 w-48 sm:w-56 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-500">
                  ROI Prediction
                </span>
                <TrendingUp className="text-indigo-600 w-3.5 h-3.5" />
              </div>
              <div className="space-y-3">
                <div className="flex items-end gap-1 h-16 sm:h-24 justify-between px-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "40%" }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="w-full bg-indigo-100 rounded-t-sm"
                  ></motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "55%" }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="w-full bg-indigo-100 rounded-t-sm"
                  ></motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "45%" }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                    className="w-full bg-indigo-100 rounded-t-sm"
                  ></motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "70%" }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="w-full bg-indigo-100 rounded-t-sm"
                  ></motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "60%" }}
                    transition={{ delay: 1.9, duration: 0.8 }}
                    className="w-full bg-indigo-100 rounded-t-sm"
                  ></motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "85%" }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                    className="w-[120%] bg-indigo-600 rounded-t-sm shadow-lg shadow-indigo-200"
                  ></motion.div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-tighter">
                    Est. ROI
                  </div>
                  <div className="text-sm font-black text-indigo-600 tracking-tight">
                    +12.4%
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Market Pulse Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
              className="absolute top-12 -right-4 sm:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <BarChart3 className="text-indigo-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Market Hotspot
                </p>
                <p className="text-[0.625rem] text-slate-500 font-medium">
                  Austin, TX | 8.2 Score
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid (Bento Style) */}
      <section className="py-32 bg-slate-100 rounded-t-[3rem] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight text-slate-900 mb-6">
              Precision over guesswork.
            </h2>
            <p className="text-slate-600 text-lg">
              We replace traditional real estate intuition with hard data,
              giving sellers an unfair advantage in a fluctuating market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 bg-white p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <BarChart3 className="text-indigo-600 mb-6 w-10 h-10" />
                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  Real-time Predictive Analytics
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-lg">
                  Our neural network analyzes 450+ data points per listing—from
                  hyper-local school district shifts to regional economic
                  indicators—to find your perfect price floor.
                </p>
              </div>
              <div className="mt-12 overflow-hidden rounded-xl border border-slate-100">
                <img
                  alt="Data visualization dashboard"
                  className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-indigo-600 p-8 md:p-10 rounded-3xl text-white flex flex-col justify-between shadow-xl shadow-indigo-900/20 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10">
                <ShieldCheck className="text-indigo-200 mb-6 w-10 h-10 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Secured Value Protection
                </h3>
                <p className="text-indigo-100 leading-relaxed font-medium">
                  Lock in your property's value with our predictive hedging
                  tools that alert you of market downturns before they hit your
                  zip code.
                </p>
              </div>
              <button className="mt-10 text-sm font-bold flex items-center gap-2 group/btn relative z-10">
                Explore Security{" "}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/60 shadow-sm"
            >
              <Sparkles className="text-indigo-600 mb-6 w-8 h-8" />
              <h3 className="text-xl font-bold mb-4 text-slate-900">
                Smart Listing Optimization
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                AI-generated descriptions and photo enhancements that are
                statistically proven to increase click-through rates by 34%.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 bg-white p-8 md:p-10 rounded-3xl flex flex-col-reverse sm:flex-row items-center gap-10 overflow-hidden shadow-sm"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  Concierge Support
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  A dedicated human advisor paired with our AI engine ensures
                  you never navigate the complexities of closing alone.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 cursor-pointer group">
                  Meet the team{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="flex-1 w-full sm:-mr-12">
                <img
                  alt="Professional realtor handshake"
                  className="w-full h-48 sm:aspect-video object-cover rounded-2xl shadow-md"
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerHero;
