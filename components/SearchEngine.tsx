
import React, { useState } from 'react';
import { SearchParams } from '../types';
import { CITIES } from '../constants';

interface SearchEngineProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchEngine: React.FC<SearchEngineProps> = ({ onSearch, isLoading }) => {
  const [params, setParams] = useState<SearchParams>({
    origin: 'Paris (CDG)',
    destination: 'Tokyo (HND)',
    departureDate: new Date().toISOString().split('T')[0],
    travelers: 2,
    mode: 'Backpacker'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <div className="w-full glass p-8 rounded-3xl shadow-2xl border border-white/5">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Origin */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Départ</label>
          <select 
            className="bg-slate-900 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={params.origin}
            onChange={(e) => setParams({...params, origin: e.target.value})}
          >
            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        {/* Destination */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Destination</label>
          <select 
            className="bg-slate-900 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={params.destination}
            onChange={(e) => setParams({...params, destination: e.target.value})}
          >
            {CITIES.map(city => <option key={`dest-${city}`} value={city}>{city}</option>)}
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Date</label>
          <input 
            type="date"
            className="bg-slate-900 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={params.departureDate}
            onChange={(e) => setParams({...params, departureDate: e.target.value})}
          />
        </div>

        {/* Travelers */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Voyageurs</label>
          <input 
            type="number"
            min="1"
            className="bg-slate-900 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={params.travelers}
            onChange={(e) => setParams({...params, travelers: parseInt(e.target.value)})}
          />
        </div>

        {/* Mode Toggles */}
        <div className="md:col-span-3 flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setParams({...params, mode: 'Backpacker'})}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${params.mode === 'Backpacker' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Optimisation Radical (Sac à dos)
          </button>
          <button
            type="button"
            onClick={() => setParams({...params, mode: 'Luxury'})}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${params.mode === 'Luxury' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Budget Illimité (Apple Style)
          </button>
        </div>

        {/* Search Action */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span>Explorer les Vols</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchEngine;
