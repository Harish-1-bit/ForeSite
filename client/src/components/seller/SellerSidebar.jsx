import { LucideHouse, LucideLayoutDashboard, LucideLifeBuoy, LucideLineChart, LucideMail, LucideSettings, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const SellerSidebar = () => {
    const {user} = useSelector((state) => state.auth);
      const location = useLocation();
      const navigate = useNavigate();
    
      const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LucideLayoutDashboard className="w-4 h-4" /> ,href: '/seller/dashboard'},
    { id: 'listings', label: 'My Listings', icon: <LucideHouse className="w-4 h-4" /> ,href: '/seller/listings'},
    { id: 'inquiries', label: 'Inquiries', icon: <LucideMail className="w-4 h-4" /> ,href: '/seller/inquiries'},
  ];

  const configItems = [
    { id: 'settings', label: 'Settings', icon: <LucideSettings className="w-4 h-4" /> },
  ];
  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Fore Site</div>
              <div className="text-xs text-gray-500">Seller Hub</div>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 py-6 px-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Main Menu</div>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
              <button
                key={item.id}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            )})}
          </nav>

        </div>

        {/* Configuration */}
        <div className="py-4 px-4 border-gray-200">
          <nav className="space-y-2">
            {configItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            
            <div className="flex items-center gap-2 min-w-0">
                <User/>
              <div className="text-sm font-semibold text-gray-900 truncate">{user.name}</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SellerSidebar