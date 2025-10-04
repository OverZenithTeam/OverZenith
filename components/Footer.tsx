
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-space-blue text-light-steel border-t border-slate-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} Explorador Interactivo del Sistema Solar. Todos los derechos reservados.</p>
        <p className="text-sm text-comet-grey mt-2">Creado con React, TypeScript y Tailwind CSS.</p>
      </div>
    </footer>
  );
};
