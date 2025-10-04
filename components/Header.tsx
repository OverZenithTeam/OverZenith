
import React from 'react';

const RocketIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path d="M12.5 11.5c-1.39 0-2.5-1.11-2.5-2.5s1.11-2.5 2.5-2.5 2.5 1.11 2.5 2.5-1.11 2.5-2.5 2.5zm4.5-2.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-9 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm4.5 7c-2.03 0-3.79-1.23-4.58-3h9.16c-.79 1.77-2.55 3-4.58 3z" />
    <path d="M4.99 15.5c.01.17.02.33.04.5h13.94c.02-.17.03-.33.04-.5H4.99z" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <RocketIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-xl font-bold text-space-blue">
              Explorador Solar
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-comet-grey hover:text-space-blue font-medium transition-colors">Planetas</a>
            <a href="#" className="text-comet-grey hover:text-space-blue font-medium transition-colors">Gráfica</a>
            <a href="#" className="text-comet-grey hover:text-space-blue font-medium transition-colors">Cuestionario</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
