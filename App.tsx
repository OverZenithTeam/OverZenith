import React from 'react';
import { Header } from './components/Header';
import { PlanetCard } from './components/PlanetCard';
import { SolarSystemChart } from './components/SolarSystemChart';
import { Quiz } from './components/Quiz';
import { Footer } from './components/Footer';
import { PLANET_DATA, QUIZ_QUESTIONS } from './constants';
import GlobeView from "./components/GlobeView";

const HEADER_H = 64;
const FOOTER_H = 56

const App: React.FC = () => {
  return (
   <div className="bg-white text-slate-800 min-h-screen font-sans">
      {/* 🧭 Header */}
      <div style={{ height: HEADER_H }}>
        <Header />
      </div>

      {/* 🌍 Globe ocupa el espacio restante de la pantalla */}
      <main
        className="w-full"
        style={{
          height: `calc(100vh - ${HEADER_H + FOOTER_H}px)`,
        }}
      >
        <div className="w-full h-full">
          <GlobeView />
        </div>
      </main>

      {/* ⚓ Footer */}
      <div style={{ height: FOOTER_H }}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
