
import React from 'react';
import { UserProfile } from '../types';

const Dashboard: React.FC = () => {
  const profile: UserProfile = {
    name: "Moha & Manele",
    avatar: "https://picsum.photos/200/200",
    miles: 45200,
    recentSearches: ["Paris → Tokyo", "Paris → Marrakech", "Lyon → Lisbonne"]
  };

  return (
    <div className="glass rounded-3xl p-6 mb-8 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img src={profile.avatar} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30" alt="Avatar" />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-900"></div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Bienvenue, {profile.name}</h2>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">Membres Platinum</span>
            <span className="text-xs text-blue-400 font-bold">{profile.miles.toLocaleString()} Miles</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-end">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Recherches Récentes</p>
        <div className="flex space-x-2">
          {profile.recentSearches.map(search => (
            <span key={search} className="text-xs glass px-3 py-1 rounded-full text-slate-300">
              {search}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
