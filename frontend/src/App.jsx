import React, { useState } from 'react';
import { Rocket, Shield, Briefcase, Activity, ChevronRight, Globe } from 'lucide-react';

const App = () => {
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Backend API ilə əlaqə (AI Matchmaking)
  const handleAiMatch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          startup_name: "Nexus-Tech", 
          sector: "AI & Cybersec", 
          stage: "Seed" 
        }),
      });
      const data = await response.json();
      setAiResponse(data);
    } catch (err) {
      console.error("Backend not connected!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-8 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10"></div>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <Activity className="text-blue-500 w-8 h-8" />
            </div>
          </div>
          <p className="text-[10px] tracking-[0.3em] text-slate-500 font-bold uppercase mb-2">IRIA - INNOVATION & DIGITAL DEVELOPMENT AGENCY</p>
          <h1 className="text-7xl font-bold text-white mb-2 tracking-tighter">Nexus<span className="text-blue-500">AI</span></h1>
          <p className="text-lg text-slate-400 font-medium italic">Sovereign Innovation Operating System</p>
          <div className="flex items-center justify-center gap-6 mt-6 text-[11px] text-slate-600 font-bold tracking-widest uppercase">
            <span className="flex items-center gap-1.5"><Shield size={12} className="text-green-500/80" /> RBAC</span>
            <span>Zero-Trust</span>
            <span>AI-Powered</span>
            <span className="flex items-center gap-1.5"><Globe size={12} /> End-to-End Encrypted</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Startups', value: '10' },
            { label: 'Investors', value: '5' },
            { label: 'Deals Tracked', value: '23' },
            { label: 'Total Ecosystem Value', value: '$94.5M', blue: true }
          ].map((s, idx) => (
            <div key={idx} className="bg-[#0f172a]/60 border border-slate-800/50 p-6 rounded-2xl text-center backdrop-blur-xl">
              <div className={`text-3xl font-bold mb-1 ${s.blue ? 'text-blue-400' : 'text-white'}`}>{s.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Startup Portal */}
          <div className="group bg-[#0f172a]/40 border border-slate-800/80 p-10 rounded-[40px] hover:border-blue-500/50 transition-all duration-500 backdrop-blur-md relative overflow-hidden">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500/20 transition-colors">
              <Rocket className="text-blue-500 w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-[10px] font-bold text-blue-400 rounded-full mb-6 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span> 10 Active Startups
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Startup Portal</h3>
            <p className="text-[11px] text-slate-500 mb-6 font-bold uppercase tracking-[0.15em]">Register • Pitch • Get Matched</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">Upload your pitch deck, build your Startup ID, and get AI-matched with the right investors and programs.</p>
            <button onClick={handleAiMatch} className="flex items-center gap-2 text-blue-400 text-xs font-bold hover:gap-3 transition-all">
              {loading ? "AI is Analyzing..." : "Enter Portal"} <ChevronRight className="w-4 h-4" />
            </button>
            {aiResponse && (
              <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-xs text-blue-200 animate-in fade-in slide-in-from-top-2">
                <strong>AI Result:</strong> {aiResponse.match_score} Match! <br/> {aiResponse.analysis}
              </div>
            )}
          </div>

          {/* Investor Portal */}
          <div className="group bg-[#0f172a]/40 border border-slate-800/80 p-10 rounded-[40px] hover:border-green-500/50 transition-all duration-500 backdrop-blur-md">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8">
              <Briefcase className="text-green-500 w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-[10px] font-bold text-green-400 rounded-full mb-6 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> 5 Verified Investors
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Investor Portal</h3>
            <p className="text-[11px] text-slate-500 mb-6 font-bold uppercase tracking-[0.15em]">Discover • Analyze • Invest</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">Access AI-powered deal flow, automated due diligence reports, and matchmaking with Azerbaijan's top startups.</p>
            <button className="flex items-center gap-2 text-green-400 text-xs font-bold hover:gap-3 transition-all">
              Enter Portal <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* IRIA Portal */}
          <div className="group bg-[#0f172a]/40 border border-slate-800/80 p-10 rounded-[40px] hover:border-yellow-500/50 transition-all duration-500 backdrop-blur-md">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-8">
              <Shield className="text-yellow-500 w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-[10px] font-bold text-yellow-500 rounded-full mb-6 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span> Sovereign Access
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">IRIA Command Center</h3>
            <p className="text-[11px] text-slate-500 mb-6 font-bold uppercase tracking-[0.15em]">Monitor • Govern • Secure</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">Ecosystem-wide analytics, resident registry, live security audit logs, and strategic KPI dashboards.</p>
            <button className="flex items-center gap-2 text-yellow-500 text-xs font-bold hover:gap-3 transition-all">
              Enter Portal <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Demo Footer */}
        <footer className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-3xl text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 mb-8">Demo Credentials</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs text-blue-400 font-bold mb-1">Startup</p>
              <p className="text-[11px] text-slate-400 font-mono italic">startup@demo.com</p>
              <p className="text-[11px] text-slate-600 font-mono">password: demo123</p>
            </div>
            <div>
              <p className="text-xs text-green-400 font-bold mb-1">Investor</p>
              <p className="text-[11px] text-slate-400 font-mono italic">investor@demo.com</p>
              <p className="text-[11px] text-slate-600 font-mono">password: demo123</p>
            </div>
            <div>
              <p className="text-xs text-yellow-500 font-bold mb-1">IRIA Admin</p>
              <p className="text-[11px] text-slate-400 font-mono italic">admin@iria.az</p>
              <p className="text-[11px] text-slate-600 font-mono">password: demo123</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
