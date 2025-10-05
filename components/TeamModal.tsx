import { type FC } from "react";

interface Props {
  onClose: () => void;
}

export const TeamModal: FC<Props> = ({ onClose }) => {
  const team = [
    {
      name: "Gabriel Freire",
      github: "https://github.com/ByteGab",
      img: "/images/team/gabriel.png",
    },
    {
      name: "Loreto Uzquiano",
      github: "https://github.com/loreeue",
      img: "/images/team/loreto.png",
    },
    {
      name: "Claudia Gil",
      github: "https://github.com/claauugil",
      img: "/images/team/claudia.png",
    },
    {
      name: "Angel Urano",
      github: "https://github.com/angelurano",
      img: "/images/team/angel.png",
    },
    {
      name: "Alejandro Gomez",
      github: "https://github.com/alejogogi",
      img: "/images/team/alejandro.png",
    },
    {
      name: "Daniel Castillo",
      github: "https://github.com/DanielCasti11o",
      img: "/images/team/daniel.png",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-mono">
      {/* Contenedor principal */}
      <div
        className="p-8 rounded-2xl shadow-xl w-full max-w-4xl flex flex-col items-center gap-8"
        style={{ backgroundColor: "#334155" }}
      >
        {/* Título */}
        <h2 className="text-2xl font-extrabold text-white text-center font-mono">
          👨‍🚀 Nuestro Equipo
        </h2>

        {/* Grid de miembros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {team.map((member) => (
            <div
              key={member.name}
              className="relative w-[160px] h-[230px] bg-[#1e293b] flex flex-col items-center justify-end p-3 gap-2 rounded-lg cursor-pointer overflow-hidden group transition-transform duration-500 hover:scale-105"
            >
              {/* Glow animado de borde */}
              <div className="absolute inset-0 -z-10 rounded-lg border-[2px] border-transparent bg-gradient-to-tr from-[#e81cff] via-[#1e293b] to-[#fc00ff] p-[1.5px]">
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: "#1e293b" }}
                />
              </div>

              {/* Imagen */}
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-20 object-cover rounded-full mb-2 border-2 border-[#1e293b] shadow-lg group-hover:scale-110 transition-transform duration-300"
              />

              {/* Nombre */}
              <p className="text-sm font-bold text-white text-center leading-tight">
                {member.name}
              </p>

              {/* GitHub */}
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e293b] font-bold text-xs hover:underline"
              >
                GitHub
              </a>
            </div>
          ))}
        </div>

        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="mt-2 px-5 py-2 bg-[#1e293b] text-white font-bold rounded-lg hover:bg-[#475569] transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
