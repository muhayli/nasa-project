import React, { useState } from 'react';
import { Camera, Globe, Zap } from 'lucide-react';
import Header from './components/Header';
import APODSection from './components/APODSection';
import MarsPhotos from './components/MarsPhotos';
import NeoTracker from './components/NeoTracker';
import Footer from './components/Footer';

type Section = 'apod' | 'mars' | 'neo';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('apod');

  const sections = [
    { id: 'apod' as Section, name: 'Picture of the Day', icon: Camera },
    { id: 'mars' as Section, name: 'Mars Photos', icon: Globe },
    { id: 'neo' as Section, name: 'Near Earth Objects', icon: Zap },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'apod':
        return <APODSection />;
      case 'mars':
        return <MarsPhotos />;
      case 'neo':
        return <NeoTracker />;
      default:
        return <APODSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative">
        {/* Background stars effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>

        <Header />

        {/* Navigation */}
        <nav className="relative z-10 px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-nebula-600 text-white shadow-lg shadow-nebula-500/25 animate-pulse-glow'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    {section.name}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 px-4 pb-8">
          <div className="animate-fade-in">
            {renderActiveSection()}
          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        .stars,
        .stars2,
        .stars3 {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 120%;
          transform: rotate(-45deg);
        }

        .stars {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="0.5" fill="white" opacity="0.8"/><circle cx="75" cy="25" r="0.3" fill="white" opacity="0.6"/><circle cx="50" cy="50" r="0.4" fill="white" opacity="0.7"/><circle cx="10" cy="75" r="0.2" fill="white" opacity="0.5"/><circle cx="90" cy="75" r="0.3" fill="white" opacity="0.6"/></svg>') repeat;
          background-size: 100px 100px;
          animation: move-twink-back 200s linear infinite;
        }

        .stars2 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.3" fill="white" opacity="0.9"/><circle cx="80" cy="20" r="0.2" fill="white" opacity="0.7"/><circle cx="60" cy="60" r="0.4" fill="white" opacity="0.8"/></svg>') repeat;
          background-size: 80px 80px;
          animation: move-twink 100s linear infinite;
        }

        .stars3 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="30" cy="30" r="0.2" fill="white" opacity="0.6"/><circle cx="70" cy="70" r="0.3" fill="white" opacity="0.8"/></svg>') repeat;
          background-size: 120px 120px;
          animation: move-twink 150s linear infinite;
        }

        @keyframes move-twink {
          from { transform: rotate(-45deg) translateX(0); }
          to { transform: rotate(-45deg) translateX(-100px); }
        }

        @keyframes move-twink-back {
          from { transform: rotate(-45deg) translateX(0); }
          to { transform: rotate(-45deg) translateX(100px); }
        }
      `}</style>
    </div>
  );
}

export default App;
