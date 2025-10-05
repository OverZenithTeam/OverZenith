import { type FC, useState } from "react";
import { Astronaut } from "./Astronaut";
import { TeamModal } from "./TeamModal";

export const Header: FC = () => {
  const [showTeam, setShowTeam] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16">
      {/* Logo */}
      <div className="absolute top-[18px] left-[40px] flex items-center">
        <div
          className="pointer-events-auto cursor-pointer"
          onClick={() => setShowTeam(true)}
        >
          <img src="/images/logo.png" className="h-20 w-24" />
        </div>
      </div>

      {/* Nombre centrado */}
      <div className="absolute top-0 left-1/2 -translate-x-[25%] pointer-events-auto">
        <img src="/images/nombre.png" className="h-[130px] w-auto" />
      </div>

      {/* Contenedor astronauta + barra */}
      <div className="absolute right-4 top-[20px] flex items-center gap-4 pointer-events-auto">
        {/* BotÃģn astronauta (modal) */}
        <Astronaut />

        {/* Barra de nivel */}
        <div className="w-[120px] h-3 bg-white/20 rounded-full overflow-hidden shadow-inner border border-white">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: "70%" }}
          ></div>
        </div>

        {/* Texto de nivel opcional */}
        <span className="text-white font-bold text-sm">Lv. 7</span>
      </div>

      {/* Modal del equipo */}
      {showTeam && <TeamModal onClose={() => setShowTeam(false)} />}
    </header>
  );
};
