
import React from 'react';
import { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="glass group relative overflow-hidden p-6 rounded-2xl hover:border-white/20 transition-all cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10">
      {flight.isVirtualInterlining && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest animate-pulse">
          Virtual Interlining (-40%)
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Airline Info */}
        <div className="flex items-center space-x-4 w-full md:w-1/4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
            <img src={flight.airlineLogo} alt={flight.airline} className="max-w-full max-h-full object-contain" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">{flight.airline}</h3>
            <p className="text-xs text-slate-400">{flight.type}</p>
          </div>
        </div>

        {/* Route Info */}
        <div className="flex items-center justify-between flex-grow w-full px-4">
          <div className="text-center">
            <p className="text-lg font-bold">{new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">{flight.origin}</p>
          </div>

          <div className="flex flex-col items-center flex-grow px-8 relative">
            <span className="text-[10px] text-slate-500 font-bold mb-1">{formatDuration(flight.duration)}</span>
            <div className="w-full h-[2px] bg-slate-800 relative">
              <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full border border-blue-500 bg-slate-900 -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-blue-500 -translate-y-1/2"></div>
              {flight.stops > 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-500"></div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} escale${flight.stops > 1 ? 's' : ''}`}
            </span>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold">22:45</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">{flight.destination}</p>
          </div>
        </div>

        {/* Happiness & Price */}
        <div className="flex flex-col items-end w-full md:w-1/4 space-y-2 border-l border-slate-800 pl-6">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Happiness</span>
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${flight.happinessScore > 8 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {flight.happinessScore}/10
            </div>
          </div>
          <p className="text-2xl font-black text-white">{flight.price}€</p>
          <button className="bg-slate-100 hover:bg-white text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all transform active:scale-95">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
