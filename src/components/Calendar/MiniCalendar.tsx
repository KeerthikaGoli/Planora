import React from 'react';
import { MONTH_NAMES, DAY_NAMES } from '../../constants/calendar';
import { daysInMonth, firstDayOfMonth, formatDateKey } from '../../utils/calendarUtils';
import type { CalendarEvent } from '../../utils/calendarUtils';

interface MiniCalendarProps {
  currentDate: Date;
  monthOffset: number;
  eventsByDate: Record<string, CalendarEvent[]>;
  darkMode: boolean;
  onDateSelect: (date: Date) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  currentDate,
  monthOffset,
  eventsByDate,
  darkMode,
  onDateSelect
}) => {
  const miniDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
  const totalDays = daysInMonth(miniDate);
  const firstDay = firstDayOfMonth(miniDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-6 h-6"></div>);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateKey = formatDateKey(miniDate.getFullYear(), miniDate.getMonth(), day);
    const hasEvents = eventsByDate[dateKey]?.length > 0;
    
    days.push(
      <div
        key={day}
        onClick={() => {
          onDateSelect(new Date(miniDate.getFullYear(), miniDate.getMonth(), day));
        }}
        className={`w-6 h-6 flex items-center justify-center text-xs cursor-pointer rounded transition-all
          ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}
          ${hasEvents ? (darkMode ? 'font-semibold text-gray-300' : 'font-semibold text-gray-900') : ''}
        `}
      >
        {day}
      </div>
    );
  }

  return (
    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {MONTH_NAMES[miniDate.getMonth()]} {miniDate.getFullYear()}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAY_NAMES.map(d => (
          <div key={d} className={`w-6 h-6 flex items-center justify-center text-xs font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {d[0]}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default MiniCalendar;
