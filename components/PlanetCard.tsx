
import React from 'react';
import type { Planet } from '../types/types';

interface PlanetCardProps {
  planet: Planet;
}

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  return (
    <div className="bg-slate-50 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-200 group">
      <img className="w-full h-56 object-cover" src={planet.image} alt={`Imagen de ${planet.name}`} />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-space-blue mb-2">{planet.name}</h3>
        <p className="text-comet-grey mb-4 h-20">{planet.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-600">Diámetro:</span>
            <span className="font-mono text-blue-700">{planet.diameter.toLocaleString('es-ES')} km</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-600">Distancia al Sol:</span>
            <span className="font-mono text-blue-700">{planet.distanceFromSun.toLocaleString('es-ES')}M km</span>
          </div>
        </div>
      </div>
    </div>
  );
};
