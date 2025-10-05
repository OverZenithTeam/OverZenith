import { type FC, useState } from 'react';
import { Header } from './components/Header';
import { PLANET_DATA, QUIZ_QUESTIONS } from './constants';
import GlobeView from "./components/GlobeView";
import Cupola from './components/Cupola';
import { SwitchCupola } from './components/SwitchCupola';
import Asteroid from './components/Asteroid';
import { XPProvider, useXPContext } from './contexts/XPContext';
import { ExperienceProvider } from './contexts/ExperienceProvider';

const HEADER_H = 64;
const FOOTER_H = 56

const AppContent: FC = () => {
  const [hiddenCupola, setHiddenCupola] = useState(false);
  const { showXPGain } = useXPContext();

  return (
    <div className="text-slate-800 min-h-screen w-screen font-sans bg-black">
      <Header />
      <main className="fixed inset-0 w-full h-full overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <GlobeView />
        </div>
        <Cupola hidden={hiddenCupola} />
        <SwitchCupola
          hidden={hiddenCupola}
          onClick={() => setHiddenCupola(!hiddenCupola)}
          onXPGain={showXPGain}
        />
          {Array.from({ length: 5 }).map((_, i) => (
                    <Asteroid key={i} size={[30, 100]} speed={0.4 + Math.random() * 0.3} zIndex={2} />
                  ))}
      </main>
    </div>
  );
};

const App: FC = () => {
  return (
    <XPProvider>
      <ExperienceProvider>
        <AppContent />
      </ExperienceProvider>
    </XPProvider>
  );
};

export default App;
