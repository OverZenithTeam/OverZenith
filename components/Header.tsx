
import React from 'react';

const Icon: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src="/images/logo.png"
    alt="OverZenith"
    className={className}
  />
);

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-red shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Icon className="h-12 w-12 text-blue-600" />
            <span className="ml-3 text-xl font-bold text-space-blue">
              OverZenith
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
