import React from 'react';
import { Rocket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-10 pt-8 pb-4">
      <div className="max-w-6xl mx-auto text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-4 animate-float">
          <Rocket className="text-nebula-400" size={48} />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cosmic-300 via-nebula-300 to-cosmic-300 bg-clip-text text-transparent">
            NASA Space Explorer
          </h1>
        </div>
        <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
          Journey through the cosmos with real NASA data. Discover the wonders of space through 
          stunning imagery, Mars exploration, and tracking near-Earth objects.
        </p>
      </div>
    </header>
  );
};

export default Header;