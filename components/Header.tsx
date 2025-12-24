
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-12">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-white uppercase italic">
            Le Voyage <span className="text-slate-500">de</span> <span className="gradient-text">Moha & Manele</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Intelligence Aérienne de Demain</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-xs font-bold text-white border-b-2 border-blue-500 pb-1">Explorer</a>
        <a href="#" className="text-xs font-bold text-slate-400 hover:text-white transition-all">Destinations</a>
        <a href="#" className="text-xs font-bold text-slate-400 hover:text-white transition-all">Offres</a>
        <a href="#" className="text-xs font-bold text-slate-400 hover:text-white transition-all">Support</a>
      </nav>

      <div className="flex items-center space-x-4">
        <button className="text-slate-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-xs font-bold border border-white/10 transition-all">
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
