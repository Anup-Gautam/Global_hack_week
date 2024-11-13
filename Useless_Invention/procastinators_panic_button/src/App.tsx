import React, { useState, useEffect } from 'react';
import { AlertCircle, Brain, Clock, TimerReset, Zap } from 'lucide-react';
import { PanicButton } from './components/PanicButton';
import { TimeCounter } from './components/TimeCounter';
import { TaskGenerator } from './components/TaskGenerator';
import { ProductivityTip } from './components/ProductivityTip';

function App() {
  const [isPanicked, setIsPanicked] = useState(false);
  const [totalProcrastinationTime, setTotalProcrastinationTime] = useState(0);
  const [panicEpisodes, setPanicEpisodes] = useState(0);

  useEffect(() => {
    let timer: number;
    if (isPanicked) {
      timer = window.setTimeout(() => {
        setIsPanicked(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isPanicked]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPanicked) {
        setTotalProcrastinationTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPanicked]);

  const handlePanic = () => {
    setIsPanicked(true);
    setPanicEpisodes(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isPanicked ? 'bg-red-50' : 'bg-slate-50'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            The Procrastinator's Panic Button
          </h1>
          <p className="text-slate-600">Your emergency productivity facade generator</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className={`p-6 bg-white rounded-xl shadow-lg transition-transform duration-300 ${
              isPanicked ? 'scale-105' : ''
            }`}>
              <PanicButton onClick={handlePanic} disabled={isPanicked} />
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Clock className="text-blue-500" />
                Time "Invested" Stats
              </h2>
              <TimeCounter 
                procrastinationTime={totalProcrastinationTime}
                panicEpisodes={panicEpisodes}
              />
            </div>
          </div>

          <div className="space-y-6">
            {isPanicked && (
              <div className="p-6 bg-white rounded-xl shadow-lg animate-pulse">
                <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                  <Zap className="text-yellow-500" />
                  Current "Important Task"
                </h2>
                <TaskGenerator />
              </div>
            )}

            <div className={`p-6 bg-white rounded-xl shadow-lg ${
              isPanicked ? 'opacity-90 scale-95' : ''
            } transition-all duration-300`}>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Brain className="text-purple-500" />
                Actual Productivity Tip
              </h2>
              <ProductivityTip />
            </div>

            {isPanicked && (
              <div className="p-4 bg-amber-100 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-amber-600" />
                <p className="text-amber-700">
                  Panic mode will disable in {10} seconds to prevent overuse!
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>Remember: The best way to look productive is to actually be productive 😉</p>
        </footer>
      </div>
    </div>
  );
}

export default App;