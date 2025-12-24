
import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import SearchEngine from './components/SearchEngine';
import FlightCard from './components/FlightCard';
import Dashboard from './components/Dashboard';
import { Flight, SearchParams, SortOption } from './types';
import { searchFlights, sortFlights } from './services/flightService';
import { getTravelAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.HAPPINESS);
  const [advice, setAdvice] = useState<string | null>(null);
  const [currentDestination, setCurrentDestination] = useState<string>('');

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setAdvice(null);
    setCurrentDestination(params.destination);
    
    try {
      const results = await searchFlights(params);
      setFlights(sortFlights(results, sortOption));
      
      // Fetch AI advice in background
      getTravelAdvice(params.destination, params.mode).then(res => setAdvice(res));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (flights.length > 0) {
      setFlights(prev => sortFlights(prev, sortOption));
    }
  }, [sortOption]);

  return (
    <Router>
      <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
        <Header />
        
        <Dashboard />

        <div className="mb-12">
          <div className="relative">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>
             <SearchEngine onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results List */}
          <div className="lg:col-span-2 space-y-6">
            {flights.length > 0 && (
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold flex items-center space-x-2">
                  <span>Résultats trouvés</span>
                  <span className="bg-slate-800 text-xs px-2 py-1 rounded-full text-slate-400">{flights.length}</span>
                </h2>
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button 
                    onClick={() => setSortOption(SortOption.CHEAPEST)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${sortOption === SortOption.CHEAPEST ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Le moins cher
                  </button>
                  <button 
                    onClick={() => setSortOption(SortOption.FASTEST)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${sortOption === SortOption.FASTEST ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Le plus rapide
                  </button>
                  <button 
                    onClick={() => setSortOption(SortOption.HAPPINESS)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${sortOption === SortOption.HAPPINESS ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Happiness
                  </button>
                </div>
              </div>
            )}

            {flights.length === 0 && !isLoading && (
              <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                <p className="text-slate-500">Prêt pour votre prochaine aventure ? <br/>Commencez votre recherche ci-dessus.</p>
              </div>
            )}

            {flights.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>

          {/* AI Side Panel */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl border border-blue-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-100 uppercase text-xs tracking-widest">Conseils AI Exclusifs</h3>
              </div>
              
              {!advice && isLoading && (
                 <div className="space-y-3">
                  <div className="h-3 bg-slate-800 rounded animate-pulse w-full"></div>
                  <div className="h-3 bg-slate-800 rounded animate-pulse w-5/6"></div>
                  <div className="h-3 bg-slate-800 rounded animate-pulse w-4/6"></div>
                </div>
              )}

              {advice && (
                <div className="prose prose-invert prose-sm">
                  <p className="text-slate-300 italic text-sm leading-relaxed whitespace-pre-line">
                    "{advice}"
                  </p>
                </div>
              )}

              {!advice && !isLoading && (
                <p className="text-xs text-slate-500">Lancez une recherche pour recevoir des recommandations personnalisées pour Moha et Manele.</p>
              )}
            </div>

            <div className="glass p-6 rounded-3xl relative overflow-hidden group">
               <img src="https://picsum.photos/seed/travel/600/400" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" alt="bg" />
               <div className="relative z-10">
                 <h3 className="font-bold text-white mb-2">Pourquoi Virtual Interlining ?</h3>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   Notre algorithme combine des vols de compagnies qui n'ont normalement pas d'accord commercial. 
                   <br/><br/>
                   <span className="text-blue-400 font-bold">Avantages :</span> Économisez jusqu'à 40%. Accédez à des routes inexistantes sur les comparateurs classiques.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
