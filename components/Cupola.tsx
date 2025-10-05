import { type FC } from 'react';
import fondo from '../images/fondo.png';

interface CupolaProps {
  hidden: boolean;
}

const Cupola: FC<CupolaProps> = ({ hidden = false }) => {
  if (hidden) return null;
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      <img
        src="cupula.png"
        alt="Cupola view"
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />
      <div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,1) 100%)',
          zIndex: 2
        }}
      />
    </div>
  );
};

export default Cupola;
