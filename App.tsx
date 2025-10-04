import { type FC } from 'react';
import { Header } from './components/Header';
import { Quiz } from './components/Quiz';
import { Footer } from './components/Footer';
import { PLANET_DATA, QUIZ_QUESTIONS } from './constants';
import GlobeView from "./components/GlobeView";
import Cupola from './components/Cupola';

const HEADER_H = 64;
const FOOTER_H = 56

const App: FC = () => {
  return (
    <div className="text-slate-800 min-h-screen font-sans">
      <Header />
      <main className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <GlobeView />
        </div>
        <Cupola hidden={false} />
      </main>
      <div style={{ height: FOOTER_H }}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
