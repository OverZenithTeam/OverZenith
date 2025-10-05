import { type FC } from "react";
import { Astronaut } from "./Astronaut";

export const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16">
      <div className="absolute top-[18px] left-[40px] flex items-center">
        <div className="pointer-events-auto">
          <img src="/images/logo.png" className="h-20 w-24" />
        </div>
      </div>

      <div className="flex justify-center w-full h-full">
        <img src="/images/nombre.png" className="h-[130px] w-auto" />
      </div>

      <div className="absolute right-4 top-[20px] flex items-center gap-4 pointer-events-auto">
        <Astronaut />

        <div className="w-[120px] h-3 bg-white/20 rounded-full overflow-hidden shadow-inner border border-white">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: "70%" }}
          ></div>
        </div>

        <span className="text-white font-bold text-sm">Lv. 7</span>
      </div>
    </header>
  );
};
