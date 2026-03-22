import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";

export default function Register() {
    const {user,isError,message}=useSelector((state) => state.auth) 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name:"", email:"", phone:"", password:""
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(formData))
    }

    useEffect(()=>{
        if(isError && message){ toast.error(message) } 
        if(user){ navigate('/') }
    },[isError,user,message,navigate])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

  return (
    <div className="flex w-full min-h-screen relative overflow-hidden bg-white">
      {/* Left Side: Visual/Hero Section - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-r border-slate-100">
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        {/* Ambient Glows */}
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/4 -left-1/4 w-160 h-160 bg-blue-600/20 rounded-full blur-3xl"></motion.div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between p-16 w-full text-white">
          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration: 0.8}} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-black text-indigo-600 tracking-tighter">FS</span>
            </div>
            <span className="text-3xl font-black tracking-tight">ForeSite</span>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-xl">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
              Start your <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-blue-300">investment</span> journey.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-slate-300 font-medium leading-relaxed max-w-md">
              Join thousands of investors using AI-driven analytics to build and manage their real estate portfolios with unwavering confidence.
            </motion.p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 1, duration: 0.8}} className="flex items-center gap-8 border-t border-white/10 pt-8 mt-12">
            <div>
              <p className="text-3xl font-black text-white">12k+</p>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">Active Assets</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div>
              <p className="text-3xl font-black text-white">98%</p>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">Analysis Accuracy</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 xl:p-24 bg-white relative overflow-y-auto">
        {/* Floating gradient orb for right side background (subtle) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md relative z-10 my-auto">
          
          <motion.div variants={itemVariants} className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-2xl font-black text-white tracking-tighter">FS</span>
            </div>
            <span className="text-3xl font-black tracking-tight text-slate-900">ForeSite</span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Create Account</h2>
            <p className="text-slate-500 font-medium">Join ForeSite to start investing smarter.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="name">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  name="name" value={formData.name} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium outline-none"
                  id="name" placeholder="John Anderson" required type="text"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="phone">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium outline-none"
                  id="phone" placeholder="+1 (555) 000-0000" required type="text"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  name="email" value={formData.email} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium outline-none"
                  id="email" placeholder="investor@foresite.com" required type="email"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="password">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  name="password" value={formData.password} onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium outline-none"
                  id="password" placeholder="••••••••" required type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <label className="flex items-start cursor-pointer group">
                <input className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer mt-0.5" type="checkbox" required />
                <span className="ml-3 text-sm font-medium text-slate-600 transition-colors">
                  I agree to the <button type="button" className="text-indigo-600 font-bold hover:underline">Terms of Service</button> and <button type="button" className="text-indigo-600 font-bold hover:underline">Privacy Policy</button>
                </span>
              </label>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/10 hover:bg-indigo-600 hover:shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group mt-2"
              type="submit"
            >
              <span>Initialize Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-widest text-[0.65rem]">Or authorize via</span></div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors font-bold text-sm text-slate-700 group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
              <span>Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors font-bold text-sm text-slate-700 group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="#0077b5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              <span>LinkedIn</span>
            </button>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-8 text-center text-sm font-medium text-slate-500">
            Already have an active portfolio?
            <Link to={'/login'} className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline ml-1.5 transition-all">
              Log in here
            </Link>
          </motion.p>
        </motion.div>

        <div className="absolute bottom-6 text-[0.65rem] font-bold tracking-widest uppercase text-slate-400 flex gap-6 mt-12">
          <Link to="#" className="hover:text-indigo-600 transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-indigo-600 transition-colors">Terms</Link>
          <span>© 2026 ForeSite</span>
        </div>
      </div>
    </div>
  );
}
