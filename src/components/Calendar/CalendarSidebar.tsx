import React from 'react';
import { X } from 'lucide-react';
import type { CalendarEvent } from '../../utils/calendarUtils';
import MiniCalendar from './MiniCalendar';

interface CalendarSidebarProps {
  showSidebar: boolean;
  darkMode: boolean;
  showMiniCalendar: boolean;
  currentDate: Date;
  eventsByDate: Record<string, CalendarEvent[]>;
  stats: { total: number; byCategory: Array<{ name: string; count: number }> };
  upcomingEvents: CalendarEvent[];
  isMobile?: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  showSidebar,
  darkMode,
  showMiniCalendar,
  currentDate,
  eventsByDate,
  stats,
  upcomingEvents,
  isMobile,
  onClose,
  onDateSelect,
  onEventClick
}) => {
  if (!showSidebar) return null;

  return (
    <div className={`app-panel elevated transition-all duration-300 border-r border-app overflow-hidden ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-11/12 max-w-xs' : 'w-80'}`}>
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold heading-accent heading-underline`}>Quick View</h2>
          <button onClick={onClose} className={`lg:hidden ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="space-y-3 mb-6">
          <div className={`p-4 rounded-lg elevated ${darkMode ? 'btn-accent' : 'bg-gray-900'} text-white`}>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-80">Total Events in this Month</div>
          </div>
          
          {stats.byCategory.map((cat) => (
            <div key={cat.name} className={`p-3 rounded-lg elevated ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm capitalize ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cat.name}</span>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cat.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Calendars */}
        {showMiniCalendar && (
          <div className="mb-6 space-y-3">
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Navigation</h3>
            <div className="app-card elevated border border-app p-4">
              <MiniCalendar
                currentDate={currentDate}
                monthOffset={-1}
                eventsByDate={eventsByDate}
                darkMode={darkMode}
                onDateSelect={onDateSelect}
              />
            </div>
            <div className="app-card elevated border border-app p-4">
              <MiniCalendar
                currentDate={currentDate}
                monthOffset={1}
                eventsByDate={eventsByDate}
                darkMode={darkMode}
                onDateSelect={onDateSelect}
              />
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="mb-6">
          <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Upcoming Events</h3>
          <div className="space-y-2">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border-l-4 transition-all hover:scale-102 cursor-pointer elevated ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white'}`}
                style={{ borderColor: event.color }}
                onClick={() => onEventClick(event)}
              >
                <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{event.title}</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {event.date} • {event.startTime}
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} text-center py-4`}>
                No upcoming events
              </div>
            )}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className={`app-card elevated border border-app p-4`}>
          <h3 className={`font-semibold mb-2 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Keyboard Shortcuts</h3>
          <div className={`space-y-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex justify-between">
              <span>← / →</span>
              <span>Navigate months</span>
            </div>
            <div className="flex justify-between">
              <span>T</span>
              <span>Go to today</span>
            </div>
            <div className="flex justify-between">
              <span>N</span>
              <span>New event</span>
            </div>
            <div className="flex justify-between">
              <span>Double click</span>
              <span>Add event on date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
