import { type FC, useState } from "react";
import { Astronaut } from "./Astronaut";
import { TeamModal } from "./TeamModal";
import { useExperienceContext } from "../contexts/ExperienceProvider";
import name from "../images/nombre.png";
import logo from "../images/logo.png";

export const Header: FC = () => {
  const [showTeam, setShowTeam] = useState(false);
  const { levelInfo, resetExperience, experienceData } = useExperienceContext();

  // Calculate the percentage of progress towards the next level
  const progressPercentage = levelInfo.xpForNextLevel > 0
    ? (levelInfo.currentLevelXP / levelInfo.xpForNextLevel) * 100
    : 100;

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16">
      {/* Logo - Arriba a la izquierda */}
      <div className="absolute top-4 left-6 flex items-center">
        <div
          className="pointer-events-auto cursor-pointer"
          onClick={() => setShowTeam(true)}
        >
          <img src={logo} className="h-12 w-auto" alt="Logo" />
        </div>
      </div>

	   {/* Name */}
		<div className="absolute top-0 left-1/2 -translate-x-[25%] pointer-events-auto hidden md:block">
		<img src={name} className="h-[130px] w-auto" />
		</div>

      {/* Container astronaut y Level Bar - Arriba a la derecha */}
      <div className="absolute right-4 top-4 flex items-center gap-4 pointer-events-auto">
        {/* Boton astronauta (modal) */}
        <Astronaut />

        {/* Level Bar */}
        <div className="w-[120px] h-3 bg-white/20 rounded-full overflow-hidden shadow-inner border border-white">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>

        {/* Tooltip */}
        <div className="relative group">
          <span className="text-white font-bold text-sm cursor-help">
            Lv. {levelInfo.level}
          </span>

          {/* Tooltip with detailed information */}
          <div className="absolute top-full right-0 mt-2 hidden group-hover:block z-50">
            <div className="bg-gray-800 text-white text-xs rounded py-2 px-3 whitespace-nowrap shadow-lg border border-gray-600">
              <div>Level {levelInfo.level}</div>
              <div>{levelInfo.currentLevelXP} / {levelInfo.xpForNextLevel} XP</div>
              <div className="text-gray-300">Total XP: {experienceData.totalXP}</div>
              {levelInfo.xpForNextLevel > 0 && (
                <div className="text-gray-300">
                  {levelInfo.xpForNextLevel - levelInfo.currentLevelXP} XP to next level
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Team Modal */}
      {showTeam && <TeamModal onClose={() => setShowTeam(false)} />}
    </header>
  );
};
