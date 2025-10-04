import { type FC } from 'react';
import { EyeClose } from './Icons/EyeClose';
import { Eye } from './Icons/Eye';

interface Props {
  hidden: boolean;
  onClick: () => void;
}

export const SwitchCupola: FC<Props> = ({ hidden, onClick }) => {
  return (
    <>
      {/* Botón del ojo (queda fijo en la esquina) */}
      <div className="absolute bottom-4 right-4 z-50">
        <button
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
          onClick={onClick}
        >
          {hidden ? (
            <EyeClose width={32} height={32} color="white" />
          ) : (
            <Eye width={32} height={32} color="white" />
          )}
        </button>
      </div>

      {/* Botón "Desplegado" centrado */}
      {!hidden && (
        <div className="absolute left-1/2 bottom-200 transform -translate-x-1/4 z-100">
          <button className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
            PROBAR TUS CONOCIMIENTOS
          </button>
        </div>
      )}
    </>
  );
};

