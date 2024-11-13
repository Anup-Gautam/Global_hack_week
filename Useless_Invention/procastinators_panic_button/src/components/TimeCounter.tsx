import React from 'react';
import { Timer, AlertTriangle } from 'lucide-react';

interface TimeCounterProps {
  procrastinationTime: number;
  panicEpisodes: number;
}

export const TimeCounter: React.FC<TimeCounterProps> = ({ procrastinationTime, panicEpisodes }) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Timer className="text-blue-500" />
          <span className="text-blue-700">Time "Invested":</span>
        </div>
        <span className="font-mono text-lg font-bold text-blue-800">
          {formatTime(procrastinationTime)}
        </span>
      </div>

      <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-amber-500" />
          <span className="text-amber-700">Panic Episodes:</span>
        </div>
        <span className="font-mono text-lg font-bold text-amber-800">
          {panicEpisodes}
        </span>
      </div>
    </div>
  );
};