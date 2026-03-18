import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast, Toaster } from "sonner";
export default function Login() {
    const {user,isError,message}=useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(formData))
    }
useEffect(()=>{
   if(isError && message){
        toast.error(message)
    } 
    if(user){
        navigate('/')
    }
   
},[user,isError,message])

  return (
    <div className="flex w-full min-h-screen relative overflow-hidden">

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-900">
        <div
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-pulse"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce" style={{ animationDuration: '7s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between p-16 w-full text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-blue-600">FS</span>
            </div>
            <span className="text-3xl font-extrabold tracking-tight">Fore Site</span>
          </div>

          {/* Main Content */}
          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold leading-tight mb-6 animate-slide-up">
              The future of real estate <span className="text-blue-200">investment</span>.
            </h1>
            <p className="text-lg text-white/80 font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Harness the power of AI-driven analytics to manage portfolios and discover high-yield opportunities before the market reacts.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <p className="text-3xl font-bold">12k+</p>
              <p className="text-xs uppercase tracking-widest text-white/60">Active Assets</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-xs uppercase tracking-widest text-white/60">Analysis Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 bg-white">
        {/* Form Container */}
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">FS</span>
            </div>
            <span className="text-3xl font-extrabold tracking-tight">Fore Site</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Log in to your investment dashboard.</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
              name="email"
              value={email}
              onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-slate-300"
                id="email"
                placeholder="investor@example.com"
                required
                type="email"
              />
            </div>

            {/* Password Input */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                name="password"
              value={password}
              onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-slate-300"
                  id="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors duration-200"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <label className="flex items-center cursor-pointer group">
                <input className="w-5 h-5 rounded border border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 bg-white accent-blue-600 transition-all cursor-pointer" type="checkbox" />
                <span className="ml-2 text-sm text-slate-600 group-hover:text-blue-600 transition-colors duration-200">Remember me</span>
              </label>
              <a className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200" href="#">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 group"
              type="submit"
            >
              <span>Login to Dashboard</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            {/* Google Button */}
            <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all duration-200 font-medium text-slate-700 group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>

            {/* LinkedIn Button */}
            <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all duration-200 font-medium text-slate-700 group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="#0077b5" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
              <span className="hidden sm:inline">LinkedIn</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-12 text-center text-sm text-slate-500 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            Don't have an account?
            <Link to={'/register'} className="text-blue-600 font-bold hover:text-blue-700 hover:underline ml-1 transition-all duration-200">
              Request access
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-auto pt-10 text-xs text-slate-400 flex gap-4 flex-wrap justify-center">
          <a className="hover:text-blue-600 transition-colors duration-200" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-blue-600 transition-colors duration-200" href="#">
            Terms of Service
          </a>
          <span>© 2026 Fore Site Inc.</span>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
