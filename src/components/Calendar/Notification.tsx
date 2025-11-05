import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const messageLines = message.split('\n');
  
  return (
    <div 
      className={`fixed top-4 right-4 z-[9999] px-6 py-4 rounded-xl shadow-2xl border-2 flex items-start gap-3 animate-fade-in max-w-md
        ${type === 'success' 
          ? 'bg-gray-900 border-gray-700 text-white' 
          : 'bg-gray-900 border-gray-700 text-white'}`}
      style={{ 
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        filter: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform',
        isolation: 'isolate'
      }}
    >
      {type === 'success' ? (
        <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-6 h-6 flex-shrink-0 text-yellow-300 mt-0.5" />
      )}
      <div className="flex-1">
        {messageLines.map((line, index) => (
          <div key={index} className={`font-semibold text-base ${index > 0 ? 'mt-1' : ''}`}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
