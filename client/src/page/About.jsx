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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 via-slate-900 to-slate-900/80"></div>
          {/* Decorative mesh/grid background could go here */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md border border-white/10">
            <Home className="w-4 h-4" />
            <span>Welcome to ForeSite</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Pioneering the Future of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
              Real Estate
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
            ForeSite empowers investors, buyers, and sellers with unparalleled
            AI-driven analytics, ensuring every real estate decision is backed
            by intelligent data, deep market insights, and comprehensive
            financial clarity.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/all-properties"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 px-8 rounded-xl transition duration-200 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              Explore Properties
            </Link>
            <Link
              to="/roi-calculator"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3.5 px-8 rounded-xl transition duration-200 border border-white/10"
            >
              ROI Calculator
            </Link>
          </div>
        </div>

        {/* Soft bottom edge transition */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-[#F8FAFC] to-transparent"></div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-linear-to-tr from-blue-100 to-indigo-50 rounded-3xl transform -rotate-3 z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80"
                alt="Modern Real Estate"
                className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-xl border border-white"
              />
              <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-semibold">
                      Data Accuracy
                    </div>
                    <div className="text-xl font-bold text-slate-900">
                      99.9%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Intelligence meets <br />
                infrastructure.
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Traditional real estate relies heavily on guesswork and
                intuition. ForeSite transforms the paradigm by bringing
                institutional-grade analytics to everyday investors and
                homebuyers.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our platform aggregates countless data points, leveraging custom
                Language Models to interpret nuances in property conditions,
                neighborhood trajectories, and historical pricing to deliver
                actionable intelligence.
              </p>

              <ul className="space-y-4">
                {[
                  "Eliminate emotional investing with objective ROI projections.",
                  "Streamline communication between buyers, sellers, and agents.",
                  "Reduce due diligence time from weeks to minutes.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to scale your portfolio.
            </h2>
            <p className="text-lg text-slate-600">
              We've engineered a comprehensive suite of tools designed to cover
              the entire lifecycle of real estate investment and management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${feature.bgColor} ${feature.borderColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            {/* abstract circles */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Ready to transform your investments?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                Join thousands of modern investors leveraging AI to build
                smarter, more profitable real estate portfolios.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-4 px-10 rounded-xl hover:bg-slate-50 transition duration-200 hover:scale-105 active:scale-95 shadow-xl"
              >
                Create Your Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
