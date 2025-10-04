import { type FC, useState } from 'react';
import { Header } from './components/Header';
import { Quiz } from './components/Quiz';
import { Footer } from './components/Footer';
import { PLANET_DATA, QUIZ_QUESTIONS } from './constants';
import GlobeView from "./components/GlobeView";
import Cupola from './components/Cupola';
import { SwitchCupola } from './components/SwitchCupola';

const HEADER_H = 64;
const FOOTER_H = 56

const App: FC = () => {
  const [hiddenCupola, setHiddenCupola] = useState(false);

  return (
    <div className="text-slate-800 min-h-screen font-sans">
      <Header />
      <main className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <GlobeView />
        </div>
        <Cupola hidden={hiddenCupola} />
        <SwitchCupola hidden={hiddenCupola} onClick={() => setHiddenCupola(!hiddenCupola)} />
      </main>
      <div style={{ height: FOOTER_H }}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
