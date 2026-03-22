import {
  Home,
  LayoutDashboard,
  Building2,
  Users,
  X,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/admin/property-management",
      label: "Property Management",
      icon: Building2,
    },
    {
      path: "/admin/user-management",
      label: "User Management",
      icon: Users,
    },
  ];

  const SidebarContent = () => (
    <div className="h-full bg-white border-r border-slate-200 flex flex-col w-64 md:w-56">
      {/* Logo */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => onClose?.()}
        >
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
            FS
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 leading-tight">
              ForeSite
            </div>
            <div className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">
              Admin Terminal
            </div>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-lg hover:bg-slate-50 text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-8 px-4 overflow-y-auto">
        <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
          Control Panel
        </div>
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "text-slate-400"}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
          Navigation
        </div>
        <Link
          to="/"
          onClick={() => onClose?.()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
        >
          <Home size={18} className="text-slate-400" />
          <span>Exit Admin</span>
        </Link>
      </div>

      {/* System Status */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest">
              Core Status
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-700">
              AI Engine Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0"
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;