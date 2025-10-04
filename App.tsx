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
    <div className="text-slate-800 min-h-screen font-sans">
      <Header />
      <main className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <GlobeView />
        </div>
      </main>
      <div style={{ height: FOOTER_H }}>
        <Footer />
      </div>
    </div>
  );
};

export default App;