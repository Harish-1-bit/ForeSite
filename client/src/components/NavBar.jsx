import { ChevronDown, LogOut, Menu, Settings, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const roleRoutes = {
    admin: "/admin/dashboard",
    seller: "/seller/dashboard",
    customer: "/user/dashboard",
  };

  const handleProfile = (user) => {
    const route = roleRoutes[user?.role] || "/login";
    navigate(route);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Properties", path: "/all-properties" },
    { name: "ROI Calculator", path: "/roi-calculator" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side: Logo/Brand */}
          <Link to={"/"} className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
              <span className="text-white font-black tracking-tighter text-lg">
                FS
              </span>
            </div>
            <span className="hidden sm:block text-2xl font-black text-slate-900 tracking-tight">
              ForeSite
            </span>
          </Link>

          {/* Center: Navigation Links Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Auth / User Menu / Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop User Menu */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                  <button
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 bg-linear-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center shadow-inner">
                      <span className="text-indigo-700 text-sm font-black uppercase">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-extrabold text-slate-900 leading-none">
                        {user.name}
                      </p>
                      <p className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mt-0.5 whitespace-nowrap">
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 group-hover:text-indigo-600 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 transform origin-top-right transition-all"
                      >
                        <button
                          onClick={() => handleProfile(user)}
                          className="w-full px-4 py-2.5 text-left text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 flex items-center gap-3 transition-colors"
                        >
                          <User size={16} className="text-slate-400" />
                          <span>Command Center</span>
                        </button>

                        <div className="h-px bg-slate-100 my-1 mx-4" />

                        <button
                          onClick={() => {
                            dispatch(logoutUser());
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors"
                        >
                          <LogOut size={16} className="text-rose-400" />
                          <span>Disconnect</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-slate-900/10 hover:shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Profile Card if Logged In */}
              {user && (
                <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-lg">
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      {user.name}
                    </h4>
                    <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest">
                      {user.role}
                    </span>
                  </div>
                </div>
              )}

              {/* Mobile Links */}
              <div className="grid grid-cols-1 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
                  >
                    <span>{link.name}</span>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ChevronDown
                        size={14}
                        className="-rotate-90 text-slate-300 group-hover:text-indigo-400"
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                {user ? (
                  <>
                    <button
                      onClick={() => handleProfile(user)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm"
                    >
                      <User size={18} />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm"
                    >
                      <LogOut size={18} />
                      <span>Disconnect</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-3.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-3.5 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-indigo-600 shadow-lg shadow-indigo-600/10 transition-all"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
