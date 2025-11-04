import React from 'react';
import { Clock } from 'lucide-react';
import type { CalendarEvent } from '../../utils/calendarUtils';

interface EventTooltipProps {
  event: CalendarEvent;
  darkMode: boolean;
}

const EventTooltip: React.FC<EventTooltipProps> = ({ event, darkMode }) => {
  return (
    <div className={`absolute left-full top-0 ml-3 z-50 w-72 rounded-xl shadow-2xl border p-4 pointer-events-none transform transition-all duration-200
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      style={{ animation: 'slideIn 0.2s ease-out' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="font-bold text-base" style={{ color: event.color }}>
          {event.title}
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
          {event.category}
        </span>
      </div>
      <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {event.description}
      </div>
      <div className={`text-xs space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{event.date}</span>
        </div>
      </div>
    </div>
  );
};

export default EventTooltip;
