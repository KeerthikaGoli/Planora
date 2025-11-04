import React from 'react';
import type { CalendarEvent } from '../../utils/calendarUtils';
import { isToday, isSelectedDate, formatDateKey, hasConflict } from '../../utils/calendarUtils';
import EventTooltip from './EventTooltip';

interface CalendarDayProps {
  year: number;
  month: number;
  day: number;
  today: Date;
  selectedDate: Date | null;
  dayEvents: CalendarEvent[];
  hoveredEvent: CalendarEvent | null;
  darkMode: boolean;
  animateCalendar: boolean;
  onDateClick: (date: Date) => void;
  onDateDoubleClick: (dateKey: string) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventHover: (event: CalendarEvent | null) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  year,
  month,
  day,
  today,
  selectedDate,
  dayEvents,
  hoveredEvent,
  darkMode,
  animateCalendar,
  onDateClick,
  onDateDoubleClick,
  onEventClick,
  onEventHover
}) => {
  const dateKey = formatDateKey(year, month, day);
  const isTodayDate = isToday(year, month, day, today);
  const isSelected = isSelectedDate(year, month, day, selectedDate);
  const hasConflicts = dayEvents.length > 1 && hasConflict(dayEvents);
  const isWeekend = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;

  return (
    <div
      onClick={() => onDateClick(new Date(year, month, day))}
      onDoubleClick={(e) => {
        e.preventDefault();
        onDateDoubleClick(dateKey);
      }}
      className={`aspect-square p-2 border border-app elevated rounded-lg cursor-pointer transition-all duration-200 relative group overflow-hidden
        ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
        ${isTodayDate ? (darkMode ? 'bg-gray-750 border-gray-600 ring-1 ring-gray-500' : 'bg-gray-100 border-gray-300 ring-1 ring-gray-400') : ''}
        ${isSelected ? 'ring-1 ring-gray-600 scale-[1.02] shadow-md z-10' : ''}
        ${isWeekend && !isTodayDate ? (darkMode ? 'bg-gray-850' : 'bg-gray-50') : (darkMode ? 'bg-gray-850' : 'bg-white')}
        ${animateCalendar ? 'animate-fade-in' : ''}
      `}
      style={{ animationDelay: `${day * 10}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-semibold transition-all ${
            isTodayDate ? (darkMode ? 'text-gray-200' : 'text-gray-900') : (darkMode ? 'text-gray-300' : 'text-gray-700')
          } ${isSelected ? 'text-lg' : ''}`}>
            {day}
          </span>
          {hasConflicts && (
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-ping absolute"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-hidden space-y-1">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              onMouseEnter={() => onEventHover(event)}
              onMouseLeave={() => onEventHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
              className="text-xs p-1.5 rounded-md truncate transition-all duration-200 hover:scale-105 hover:shadow-lg relative z-20 cursor-pointer transform hover:-translate-y-0.5"
              style={{ 
                backgroundColor: event.color + '25',
                borderLeft: `3px solid ${event.color}`,
              }}
            >
              <div className={`font-semibold truncate ${darkMode ? 'text-gray-200' : ''}`} style={{ color: darkMode ? '' : event.color }}>
                {event.title}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'opacity-75'}`}>
                {event.startTime}
              </div>
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className={`text-xs font-semibold pl-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              +{dayEvents.length - 3} more
            </div>
          )}
        </div>

        {isTodayDate && (
          <div className="absolute top-1 right-1">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
          </div>
        )}
      </div>

      {hoveredEvent && dayEvents.includes(hoveredEvent) && (
        <EventTooltip event={hoveredEvent} darkMode={darkMode} />
      )}
    </div>
  );
};

export default CalendarDay;
