import React from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Sparkles,
  TrendingUp,
  Lock,
  LucideAppWindow,
} from "lucide-react";
import { Link } from "react-router-dom";

const CustomerHero = () => {
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
    <div className="bg-slate-50 font-sans text-slate-900 antialiased pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-20">
          {/* Content Column */}
          <motion.div
            className="lg:col-span-6 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-8 py-1.5 px-4 bg-indigo-100 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-[0.7rem] uppercase tracking-widest font-extrabold text-indigo-700">
                Predictive Real Estate
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-slate-900 font-extrabold text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8"
            >
              The Intelligent Way to Find Your{" "}
              <span className="text-indigo-600 italic font-medium">
                Next Home.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-lg leading-relaxed max-w-xl mb-12"
            >
              ForeSite uses predictive AI to match you with properties that fit
              your lifestyle and investment goals, before they even hit the open
              market.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link to={"/all-properties"}>
                <button className="bg-linear-to-r from-indigo-600 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-tight shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  Start Your Search
                </button>
              </Link>
              <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-tight px-6 py-4 hover:bg-indigo-50 rounded-xl transition-all group">
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch the Demo
              </button>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              variants={itemVariants}
              className="mt-20 pt-10 border-t border-slate-200 flex flex-col gap-6"
            >
              <p className="text-xs uppercase tracking-[0.15em] font-bold text-slate-400">
                Trusted by leading investors
              </p>
              <div className="flex flex-wrap items-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                <span className="font-serif italic font-bold text-2xl md:text-3xl text-slate-700">Sequoia</span>
                <span className="font-black tracking-tighter text-2xl md:text-3xl text-slate-800">a16z</span>
                <span className="font-bold tracking-[0.2em] uppercase text-lg md:text-xl text-slate-900 border-2 border-slate-900 px-2 py-0.5">BLACKROCK</span>
                <span className="font-black text-2xl md:text-3xl text-slate-800 tracking-tight flex items-center gap-1">
                  <span className="bg-[#fb651e] text-white w-8 md:w-10 h-8 md:h-10 flex items-center justify-center rounded-sm text-xl md:text-2xl">Y</span>
                  Combinator
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Imagery Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-6 relative h-full min-h-[500px] flex items-center justify-center mt-12 lg:mt-0"
          >
            {/* Background Blob */}
            <div className="absolute -right-20 top-0 bottom-0 w-[120%] bg-slate-200/50 -z-10 rounded-l-[5rem]"></div>

            {/* Main Image Container */}
            <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                alt="Modern architectural home"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              />

              {/* Floating Intelligence UI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 p-5 sm:p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 -rotate-2 hover:rotate-0 transition-all cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      AI Match Score
                    </p>
                    <p className="font-extrabold text-2xl text-slate-900">
                      98.4% Match
                    </p>
                    <div className="mt-3 flex gap-1 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "98.4%" }}
                        transition={{
                          delay: 1.5,
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Feature Section */}
      <section className="bg-white py-32 rounded-t-[3rem] mt-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
          >
            <div className="md:col-span-7 bg-slate-50 hover:bg-slate-100 transition-colors p-8 md:p-12 rounded-3xl flex flex-col justify-end min-h-[350px] md:min-h-[400px] border border-slate-100">
              <TrendingUp className="text-indigo-600 w-10 h-10 mb-6" />
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Investment-Grade Data
              </h3>
              <p className="text-slate-600 max-w-md leading-relaxed">
                Access predictive modeling that forecasts property value
                appreciation with over 92% accuracy across major metropolitan
                markets.
              </p>
            </div>

            <div className="md:col-span-5 bg-linear-to-br from-indigo-600 to-indigo-800 p-8 md:p-12 rounded-3xl text-white min-h-[350px] md:min-h-[400px] shadow-2xl shadow-indigo-900/20 group overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="relative h-full flex flex-col justify-between z-10">
                <Lock className="text-indigo-300 w-12 h-12 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight text-white">
                    Off-Market Access
                  </h3>
                  <p className="text-indigo-100 leading-relaxed font-medium">
                    Our network identifies properties before they list on public
                    databases, giving you a 14-day lead on the competition.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHero;
