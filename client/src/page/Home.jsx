import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import CustomerHero from '../components/hero/CustomerHero';
import SellerHero from '../components/hero/SellerHero';
import AdminHero from '../components/hero/AdminHero';

const Home = () => {
  const {user,isError,message}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
  },[user,isError])

  const renderHero = () => {
    if (!user) return <CustomerHero />;
    switch(user.role) {
      case 'seller':
        return <SellerHero />;
      case 'admin':
        return <AdminHero />;
      case 'customer':
      default:
        return <CustomerHero />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* Navigation */}
      <NavBar/>

      {/* Role-based Hero Section */}
      <main className="grow">
        {renderHero()}
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-white mt-auto border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-black text-slate-900">ForeSite</div>
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest font-bold text-slate-500">© 2026 ForeSite Intelligence. Editorial Real Estate Excellence.</p>
          </div>
          <div className="flex items-center gap-8">
            <a className="font-sans text-[0.6875rem] uppercase tracking-widest font-bold text-slate-500 hover:text-indigo-600 transition-colors opacity-70 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="font-sans text-[0.6875rem] uppercase tracking-widest font-bold text-slate-500 hover:text-indigo-600 transition-colors opacity-70 hover:opacity-100" href="#">Terms of Service</a>
            <a className="font-sans text-[0.6875rem] uppercase tracking-widest font-bold text-slate-500 hover:text-indigo-600 transition-colors opacity-70 hover:opacity-100" href="#">Cookies</a>
            <a className="font-sans text-[0.6875rem] uppercase tracking-widest font-bold text-slate-500 hover:text-indigo-600 transition-colors opacity-70 hover:opacity-100" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
