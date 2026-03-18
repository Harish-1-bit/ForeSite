import { ChevronDown, LogOut, Menu, Settings, TrendingUp, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'

const NavBar = () => {
    const dispatch = useDispatch()
    const {user}=useSelector((state)=>state.auth)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const roleRoutes = {
    admin:'/admin/dashboard',
    seller:'/seller/dashboard',
    customer:'/user/dashboard'
  }
  const handleProfile=(user)=>{
    const route= roleRoutes[user?.role] ||'/login'
    navigate(route)
  }
  return (
    user ? (
          <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo/Brand */}
          <Link to={'/'} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900">Fore Site</span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/all-properties" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Property</Link>
            <Link to="/roi-calculator" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">ROI Calculator</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Contact</Link>
          </div>

          {/* Right Side: User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                    {user?.name?.split(" ")[0][0]}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 text-left">{user.name}</p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button onClick={()=>handleProfile(user)} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150">
                  <User size={16} />
                  <span>My Profile</span>
                </button>
                {
                  user.role !== "admin" && (
                    <Link to="/settings" className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150">
                  <Settings size={16} />
                  <span>Setting</span>
                </Link>
                  )
                }
                <hr className="my-1" />
                <button onClick={()=>dispatch(logoutUser())} className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-150">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    ) : (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side - Logo */}
            <div className="flex-shrink-0 flex items-center flex-1">
              <Link to="/" className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">ForeSite</span>
              </Link>
            </div>
            
            {/* Center - Navigation Links */}
            <div className="hidden sm:flex sm:space-x-8 justify-center">
              <Link
                to="/all-properties"
                className="relative group text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors"
              >
                Property
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
              <Link
                className="relative group text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors"
              >
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
              <Link
                to="/contact"
                className="relative group text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
            </div>

            {/* Right side - Login button */}
            <div className="flex items-center justify-end flex-1">
              <div className="ml-4 flex items-center md:ml-6">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  )
}

export default NavBar