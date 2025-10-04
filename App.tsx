import React from 'react';
import { Header } from './components/Header';
import { PlanetCard } from './components/PlanetCard';
import { SolarSystemChart } from './components/SolarSystemChart';
import { Quiz } from './components/Quiz';
import { Footer } from './components/Footer';
import { PLANET_DATA, QUIZ_QUESTIONS } from './constants';
import GlobeView from "./components/GlobeView";

const App: React.FC = () => {
  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-space-blue mb-4">
            Bienvenido al Sistema Solar
          </h1>
          <p className="text-lg md:text-xl text-comet-grey max-w-3xl mx-auto">
            Embárcate en un viaje a través de nuestro vecindario cósmico. Explora los planetas, visualiza sus tamaños y pon a prueba tus conocimientos.
          </p>
        </section>

        {/* 🌍 Globe 3D Section (nuevo) */}
        <section className="mb-20 bg-slate-50 p-4 md:p-6 rounded-2xl shadow-lg border border-slate-200">
          <h2 className="text-3xl font-bold text-space-blue mb-4 text-center">
            La Tierra en 3D
          </h2>
          <p className="text-center text-comet-grey mb-6">
            Mueve, haz zoom y explora. Marcadores de ejemplo incluidos (Madrid, Vigo, Caracas, NYC).
          </p>
          {/* Altura real para que el canvas de WebGL se vea */}
          <div className="w-full h-[70vh]">
            <GlobeView />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
