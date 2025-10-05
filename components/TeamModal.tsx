import { type FC } from "react";

interface Props {
  onClose: () => void;
}

export const TeamModal: FC<Props> = ({ onClose }) => {
  const team = [
    { name: "< Gabriel Freire > ", github: "https://github.com/ByteGab" },
    { name: "< Loreto_ _Uzquiano >", github: "https://github.com/loreeue" },
    { name: "< Claudia Gil >", github: "https://github.com/claauugil" },
	{ name: "< Angel Urano >", github: "https://github.com/angelurano" },
	{ name: "< Alejandro_ _Gomez >", github: "https://github.com/alejogogi" },
	{ name: "< Daniel Castillo >", github: "https://github.com/DanielCasti11o" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-xl flex flex-col items-center gap-6">
        <h2 className="text-2xl font-extrabold text-white text-center mb-1">
          👨‍🚀 Nuestro Equipo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {team.map((member) => (
            <div
              key={member.name}
              className="relative w-[190px] h-[254px] bg-black flex flex-col justify-end p-4 gap-3 rounded-lg cursor-pointer overflow-hidden group transition-transform duration-500 hover:scale-105"
            >
              {/* Glow animado de borde */}
              <div className="absolute inset-0 -z-10 rounded-lg border-[3px] border-transparent bg-gradient-to-tr from-[#e81cff] via-[#40c9ff] to-[#fc00ff] p-[2px]">
                <div className="absolute inset-0 bg-black rounded-lg" />
              </div>

              {/* Glow animado por detrás */}
              <div className="absolute inset-0 -left-[5px] w-[200px] h-[264px] rounded-lg bg-gradient-to-tr from-[#e81cff] to-[#40c9ff] -z-20 transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:rotate-[-90deg] group-hover:scale-x-[1.34] group-hover:scale-y-[0.77]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#fc00ff] to-[#00dbde] scale-[0.95] blur-[20px] -z-[15] transition-all duration-500 group-hover:blur-[30px]" />

              <p className="text-2.5xl font-extrabold text-white">{member.name}</p>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e81cff] font-bold text-lg hover:underline"
              >
                GitHub
              </a>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-5 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
