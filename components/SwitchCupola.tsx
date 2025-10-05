import { type FC, useState } from "react";
import { EyeClose } from "./Icons/EyeClose";
import { Eye } from "./Icons/Eye";
import { QuizModal } from "./QuizModal";

interface QuizState {
  step: number;
  selected: string | null;
  failed: boolean;
  answers: { [key: number]: string };
  completed: boolean;
}

interface Props {
  hidden: boolean;
  onClick: () => void;
  onXPGain?: (amount: number, reason: string) => void;
}

export const SwitchCupola: FC<Props> = ({ hidden, onClick, onXPGain }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [hovered, setHovered] = useState(false); // control hover para estrellas
  const [quizState, setQuizState] = useState<QuizState | undefined>(undefined);

  const stars = [
    { top: "20%", left: "20%", size: 25, hover: { top: "-80%", left: "-30%" } },
    { top: "45%", left: "45%", size: 15, hover: { top: "-25%", left: "10%" } },
    { top: "40%", left: "40%", size: 5, hover: { top: "55%", left: "25%" } },
    { top: "20%", left: "40%", size: 8, hover: { top: "30%", left: "80%" } },
    { top: "25%", left: "45%", size: 15, hover: { top: "25%", left: "115%" } },
    { top: "5%", left: "50%", size: 5, hover: { top: "5%", left: "60%" } },
  ];

  return (
    <>
      {/* Botón del ojo */}
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

      {/* Botón "Test Knowledge" en la parte inferior */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40 font-mono">
        <button
			onClick={() => setIsQuizOpen(true)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="relative px-8 py-3 font-medium text-lg text-white bg-[#1e293b] border-[3px] border-[#1e293b] rounded-lg shadow-[0_0_0_#1e293b8c] transition-all hover:bg-transparent hover:text-white hover:shadow-[0_0_25px_#1e293b8c]"
		>
          Test Knowledge

            {/* Estrellas animadas */}
            {stars.map((star, idx) => (
              <div
                key={idx}
                className="absolute z-[-5]"
                style={{
                  top: hovered ? star.hover.top : star.top,
                  left: hovered ? star.hover.left : star.left,
                  width: `${star.size}px`,
                  transition: "all 0.8s ease",
                }}
              >
                <svg viewBox="0 0 784.11 815.53" className="w-full h-auto">
                  <path
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                    fill="#fffdef"
                  />
                </svg>
              </div>
            ))}
          </button>
        </div>

      {/* Ventana Quiz */}
      {isQuizOpen && (
        <QuizModal
          onClose={() => setIsQuizOpen(false)}
          savedState={quizState}
          onSaveState={setQuizState}
        />
      )}
    </>
  );
};
