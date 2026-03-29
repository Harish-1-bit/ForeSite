import {
  LucideLayoutDashboard,
  LucideSearch,
  LucideSettings,
  User,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CustomerSidebar = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LucideLayoutDashboard className="w-4 h-4" />,
      href: "/user/dashboard",
    },
    {
      id: "properties",
      label: "Browse Properties",
      icon: <LucideSearch className="w-4 h-4" />,
      href: "/all-properties",
    },
  ];

  const configItems = [
    {
      id: "settings",
      label: "Settings",
      icon: <LucideSettings className="w-4 h-4" />,
      href: "/settings",
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
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            FS
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 leading-tight">
              ForeSite
            </div>
            <div className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">
              Customer Hub
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

      {/* Main Menu */}
      <div className="flex-1 py-8 px-4 overflow-y-auto">
        <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
          Main Menu
        </div>
        <nav className="space-y-1.5">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.href);
                  onClose?.();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <span className={isActive ? "text-white" : "text-slate-400"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>


      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-black text-sm shadow-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 truncate">
              {user?.name}
            </div>
            <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest truncate">
              {user?.role}
            </div>
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

export default CustomerSidebar;
