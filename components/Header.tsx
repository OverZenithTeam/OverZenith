import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 pointer-events-none">
      <div className="absolute top-[18px] left-[120px] flex items-center">
        <div className="pointer-events-auto" >
          <img src="/images/logo.png" className="h-20 w-24" />
      </div>
        </div>
     <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto">
        <img src="/images/nombre.png" className="h-[130px] w-auto"/>
      </div>
    </header>
  );
};


