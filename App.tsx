import { type FC, useState } from 'react';
import { Header } from './components/Header';
import { Quiz } from './components/Quiz';
import { Footer } from './components/Footer';
import { PLANET_DATA, QUIZ_QUESTIONS } from './constants';
import GlobeView from "./components/GlobeView";
import Cupola from './components/Cupola';
import { SwitchCupola } from './components/SwitchCupola';
import Asteroid from './components/Asteroid';

const HEADER_H = 64;
const FOOTER_H = 56

const App: FC = () => {
  const [hiddenCupola, setHiddenCupola] = useState(false);

  return (
    <div className="text-slate-800 min-h-screen w-screen font-sans bg-black">
      <Header />
      <main className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <GlobeView />
        </div>
        <Cupola hidden={hiddenCupola} />
        <SwitchCupola hidden={hiddenCupola} onClick={() => setHiddenCupola(!hiddenCupola)} />
          {Array.from({ length: 5 }).map((_, i) => (
                    <Asteroid key={i} size={[30, 100]} speed={0.4 + Math.random() * 0.3} zIndex={2} />
                  ))}
      </main>
      <div style={{ height: FOOTER_H }}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
