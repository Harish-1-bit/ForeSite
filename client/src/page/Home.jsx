
import React, { useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Calculator, 
  Camera, 
  ArrowRight, 
  CheckCircle2, 
  Facebook, 
  Globe, 
  Send,
  Zap,
  Menu,
  ChevronRight
} from 'lucide-react';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Home = () => {
  const {user,isError,message}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    // if(!user){
    //   navigate('/login')
    // }
    if(isError){
      toast.error(message)
    }
  },[user,isError])
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <NavBar/>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-100/50 to-transparent blur-3xl pointer-events-none opacity-50"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-rose-100/30 blur-3xl rounded-full"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-blue-50 border border-blue-100 rounded-full">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-blue-700 uppercase tracking-widest">New: Predict version 2.5 is live</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tight">
            Data-Driven <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Real Estate</span> Wealth
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            PropelAI uses proprietary neural networks to scan millions of listings, predicting 5-year appreciation and identifying high-yield gems before they hit mainstream portals.
          </p>

          {/* Search/Discovery Bar */}
          <div className="max-w-4xl mx-auto bg-white p-3 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col md:flex-row gap-2">
            <div className="flex-[1.5] flex items-center px-6 gap-4 min-w-0 py-4">
              <MapPin className="text-blue-600 flex-shrink-0" size={24} />
              <input 
                className="w-full border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 font-bold text-lg bg-transparent" 
                placeholder="Where would you like to invest?" 
                type="text"
              />
            </div>
            <div className="w-px h-10 bg-slate-100 hidden md:block self-center"></div>
            <div className="flex-1 flex items-center px-6 gap-4 py-4">
              <Building2 className="text-slate-400 flex-shrink-0" size={24} />
              <select className="w-full border-none focus:ring-0 text-slate-600 font-bold bg-transparent appearance-none">
                <option>All Assets</option>
                <option>Multi-family</option>
                <option>Short-term Rental</option>
                <option>Commercial</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 group shadow-lg shadow-blue-600/30">
              <Search size={22} />
              Analyze
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-sm font-bold">Joined by <span className="text-slate-900">2,400+ investors</span> this week</p>
            </div>
            <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2 text-slate-900 font-black">
              <span className="text-blue-600 font-black text-2xl">4.9/5</span>
              <span className="text-sm text-slate-500">Trustpilot Score</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof Bar */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-black text-slate-900 mb-1">$4.2B</p>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Assets Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-slate-900 mb-1">12.8%</p>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Avg. Yield Alpha</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-slate-900 mb-1">24/7</p>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Market Monitoring</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-slate-900 mb-1">94%</p>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Prediction Accuracy</p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Invest with the same tools as institutional hedge funds.
            </h2>
            <p className="text-xl text-slate-500 font-medium">We've democratized high-frequency real estate data, giving you the edge to build generational wealth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Predictive Appreciation</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-6">Our AI forecasts neighborhood growth by analyzing school rankings, transit expansions, and local permits years in advance.</p>
              <button className="flex items-center gap-2 text-blue-600 font-black group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                Learn More <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Calculator size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Full-Stack ROI Sim</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-6">Accounting for local taxes, maintenance cycles, and dynamic rental yields to give you a true net-income projection.</p>
              <button className="flex items-center gap-2 text-emerald-600 font-black group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                Open Simulator <ChevronRight size={16} />
              </button>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <Camera size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Visual Health Check</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-6">Computer vision scans listing photos to detect structural issues and renovation needs before you book a physical tour.</p>
              <button className="flex items-center gap-2 text-amber-600 font-black group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                View AI Vision <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Markets Grid */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full -mr-96 -mt-96"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">Trending Opportunities</h2>
              <p className="text-slate-400 text-xl font-medium max-w-2xl">High-conviction picks based on our latest Q1 AI analysis across top tier metropolitan hubs.</p>
            </div>
            <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-xl hover:bg-blue-400 transition-all whitespace-nowrap shadow-xl">
              Explorer All Markets
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Market Card 1 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 border border-white/10">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://images.unsplash.com/photo-1542704128-0c966073c940?auto=format&fit=crop&q=80&w=800" 
                  alt="Indore"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Hot Pick</span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">+14% Growth</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-3xl font-black mb-2">Indore Central</h4>
                  <p className="text-slate-300 font-medium mb-4">Tech corridor expansion driving massive residential demand.</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Target Yield</p>
                      <p className="text-xl font-black text-emerald-400">7.8% Net</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 border border-white/10">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800" 
                  alt="Bangalore"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Institutional</span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Stable ROI</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-3xl font-black mb-2">Whitefield, BLR</h4>
                  <p className="text-slate-300 font-medium mb-4">Steady appreciation with high quality corporate tenant pool.</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Target Yield</p>
                      <p className="text-xl font-black text-blue-400">6.2% Net</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Card 3 */}
            <div className="group cursor-pointer lg:block">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 border border-white/10">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://images.unsplash.com/photo-1576085898323-2183ba97a3d4?auto=format&fit=crop&q=80&w=800" 
                  alt="Hyderabad"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Emerging</span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">High Potential</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-3xl font-black mb-2">HITEC City West</h4>
                  <p className="text-slate-300 font-medium mb-4">Upcoming metro extension making this a premium rental hub.</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Target Yield</p>
                      <p className="text-xl font-black text-indigo-400">8.1% Net</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Methodology */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-black text-xl">Real-time Alpha Engine</h4>
                  <p className="text-slate-500 text-sm font-bold">Updated every 15 mins</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Market Sentiment', value: 88, color: 'bg-emerald-500' },
                  { label: 'Inventory Velocity', value: 64, color: 'bg-blue-500' },
                  { label: 'Yield Stability', value: 92, color: 'bg-indigo-500' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      <span>{stat.label}</span>
                      <span className="text-slate-900">{stat.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-10 border-t border-slate-50 flex items-center justify-between">
                <p className="text-slate-500 text-sm font-medium">Confidence Score</p>
                <span className="text-emerald-500 font-black text-2xl tracking-tighter">Excellent</span>
              </div>
            </div>
            
            {/* Background blob */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full -z-0"></div>
          </div>

          <div>
            <span className="text-blue-600 font-black uppercase tracking-widest text-sm mb-6 block">Our Methodology</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">How we beat the market.</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 text-slate-900">Alternative Data Sets</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">We don't just use listing data. We integrate satellite imagery, social sentiment, and local commercial spend patterns to spot shifts early.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 text-slate-900">Automated Due Diligence</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Instantly verify ownership history, legal encumbrances, and municipal zoning alerts for any property in seconds.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 text-slate-900">Instant Financing Match</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">PropelAI matches your investment profile with institutional lenders offering the best LTV and interest rates for your chosen asset.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-white blur-[100px] rounded-full"></div>
             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400 blur-[100px] rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to propel your portfolio?</h2>
            <p className="text-blue-100 text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto">Join thousands of smart investors and start your 7-day free trial today. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-white text-blue-600 font-black rounded-2xl text-xl hover:bg-blue-50 transition-all shadow-xl">
                Get Started for Free
              </button>
              <button className="px-10 py-5 bg-blue-700/50 text-white font-black rounded-2xl text-xl hover:bg-blue-700 transition-all border border-blue-400/30">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <TrendingUp size={24} />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900">PropelAI</span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Democratizing institutional-grade real estate intelligence for the next generation of global investors.
              </p>
              <div className="flex gap-4">
                {[Facebook, Globe, Send].map((Icon, i) => (
                  <a key={i} className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm" href="#">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-black text-slate-900 mb-8 uppercase text-xs tracking-[0.25em]">Solutions</h5>
              <ul className="space-y-4 font-bold text-slate-500">
                <li><a className="hover:text-blue-600 transition-colors" href="#">Price Forecaster</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Yield Optimizer</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">AI Due Diligence</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Portfolio Management</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-900 mb-8 uppercase text-xs tracking-[0.25em]">Company</h5>
              <ul className="space-y-4 font-bold text-slate-500">
                <li><a className="hover:text-blue-600 transition-colors" href="#">Mission</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Engineering Blog</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Market Reports</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-900 mb-8 uppercase text-xs tracking-[0.25em]">Newsletter</h5>
              <p className="text-slate-500 font-medium mb-6">The best investment picks from our AI delivered to your inbox weekly.</p>
              <div className="flex gap-2">
                <input 
                  className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 w-full font-bold focus:ring-2 focus:ring-blue-600/20 outline-none" 
                  placeholder="Your Email" 
                  type="email"
                />
                <button className="bg-slate-900 text-white px-5 rounded-xl hover:bg-blue-600 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 font-bold text-sm">© 2024 PropelAI Intelligence Systems. Built for the future of finance.</p>
            <div className="flex gap-10 text-sm font-bold text-slate-400">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
