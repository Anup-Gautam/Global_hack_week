import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface PanicButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const PanicButton: React.FC<PanicButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-8 px-4 rounded-xl text-white font-bold text-2xl
        transition-all duration-300 transform
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed opacity-50'
          : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-95 shadow-lg hover:shadow-xl'
        }
        flex items-center justify-center gap-3
      `}
    >
      <AlertOctagon className="w-8 h-8" />
      {disabled ? 'PANICKING...' : 'PANIC!'}
    </button>
  );
};