import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="tp-toast">
      <CheckCircle2 className="w-5 h-5 text-[#f2be6b]" />
      <span className="text-sm font-medium">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
