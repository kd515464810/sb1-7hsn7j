import React from 'react';

interface ProcessingOptionsProps {
  onProcess: () => void;
  disabled: boolean;
}

export function ProcessingOptions({ onProcess, disabled }: ProcessingOptionsProps) {
  return (
    <div className="w-full max-w-2xl mt-6">
      <button
        onClick={onProcess}
        disabled={disabled}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium
                   ${
                     disabled
                       ? 'bg-gray-400 cursor-not-allowed'
                       : 'bg-blue-500 hover:bg-blue-600'
                   }
                   transition-colors`}
      >
        开始处理
      </button>
    </div>
  );
}