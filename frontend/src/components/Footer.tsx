import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-16 border-t border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-300">
              Powered by <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-cosmic-400 hover:text-cosmic-300 transition-colors">NASA Open Data</a>
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Exploring the cosmos through real NASA APIs
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cosmic-300 transition-colors"
            >
              <ExternalLink size={16} />
              NASA API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;