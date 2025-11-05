import React from 'react';
import { Clock, Plus, X, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { formatDateKey } from '../../utils/calendarUtils';
import type { CalendarEvent } from '../../utils/calendarUtils';
import { MONTH_NAMES } from '../../constants/calendar';

interface SelectedDateEventsProps {
  selectedDate: Date | null;
  selectedDateEvents: CalendarEvent[];
  darkMode: boolean;
  onClose: () => void;
  onAddEvent: (dateKey: string) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: number) => void;
}

const SelectedDateEvents: React.FC<SelectedDateEventsProps> = ({
  selectedDate,
  selectedDateEvents,
  darkMode,
  onClose,
  onAddEvent,
  onEditEvent,
  onDeleteEvent
}) => {
  // If no date is selected, show default prompt
  if (!selectedDate) {
    return (
      <div className={`app-panel elevated border border-app p-4 md:p-6 animate-fade-in`}>
        <div className={`text-center py-4 md:py-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-base md:text-lg mb-4">Select a date to view or add events</p>
          <button 
            onClick={() => onAddEvent('')}
            className={`px-6 py-2 rounded-md transition-all btn-accent text-white font-medium text-sm`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Event
          </button>
        </div>
      </div>
    );
  }

  const dateKey = formatDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

  return (
    <div className={`app-panel elevated border border-app p-4 md:p-6 animate-fade-in`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg md:text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddEvent(dateKey)}
            className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-medium flex items-center gap-1 transition-all btn-accent`}
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" />
            Add
          </button>
          <button
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
      
      {selectedDateEvents.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {selectedDateEvents.map((event, idx) => {
            const isConflict = idx > 0 && (() => {
              const prevEnd = selectedDateEvents[idx - 1].endTime.split(':').map(Number);
              const currStart = event.startTime.split(':').map(Number);
              return prevEnd[0] * 60 + prevEnd[1] > currStart[0] * 60 + currStart[1];
            })();
            
            return (
              <div
                key={event.id}
                className={`p-4 rounded-lg border-l-2 transition-all duration-200 hover:shadow-md ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                style={{ borderColor: event.color }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : ''}`} style={{ color: darkMode ? '' : event.color }}>
                      {event.title}
                    </h4>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                      {event.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEditEvent(event)}
                      className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                      title="Edit event"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isConflict && (
                  <div className={`mb-3 px-2 py-1 text-xs rounded flex items-center gap-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    <AlertCircle className="w-3 h-3" />
                    Overlaps with previous event
                  </div>
                )}
                
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.description}
                </p>
                
                <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock className="w-4 h-4" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`text-center py-4 md:py-8 sm:py-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <p className="text-base md:text-lg mb-3 md:mb-4">No events scheduled for this day</p>
          <button 
            onClick={() => onAddEvent(dateKey)}
            className={`px-6 py-2 rounded-md transition-all btn-accent text-white font-medium text-sm`}
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectedDateEvents;
