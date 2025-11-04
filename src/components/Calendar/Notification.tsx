import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg border flex items-center gap-2 animate-fade-in
      ${type === 'success' 
        ? 'bg-gray-900 border-gray-700 text-white' 
        : 'bg-gray-900 border-gray-700 text-white'}`}>
      {type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {message}
    </div>
  );
};

export default Notification;
