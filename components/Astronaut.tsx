import { useState } from "react";

export const Astronaut = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón en el header */}
      <div className="absolute right-4 top-[20px] pointer-events-auto">
        <button onClick={() => setIsOpen(true)} className="focus:outline-none">
          <img
            src="/images/boton.png"
            alt="Abrir modal"
            className="h-[80px] w-auto transform rotate-12 hover:rotate-0 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-slate-800">
            <h2 className="text-2xl font-bold mb-4">Soy un Modal 🚀</h2>
            <p className="mb-6">
              Aquí puedes mostrar contenido, formularios, información, etc.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
