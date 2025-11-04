import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { INITIAL_EVENTS, COLORS, DAY_NAMES, CATEGORIES } from '../../constants/calendar';
import { formatDateKey, daysInMonth, firstDayOfMonth, checkConflict } from '../../utils/calendarUtils';
import type { CalendarEvent } from '../../utils/calendarUtils';
import TopBar from './TopBar';
import CalendarSidebar from './CalendarSidebar';
import CalendarDay from './CalendarDay';
import CalendarModal from './CalendarModal';
import Notification from './Notification';
import SelectedDateEvents from './SelectedDateEvents';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [animateCalendar, setAnimateCalendar] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showMiniCalendar, setShowMiniCalendar] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    color: COLORS[0],
    category: 'meeting'
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const navigateMonth = useCallback((direction: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + direction, 1);
      return newDate;
    });
    setSelectedDate(null);
  }, []);

  const handleAddEvent = useCallback((date: string | null = null) => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: date || formatDateKey(today.getFullYear(), today.getMonth(), today.getDate()),
      startTime: '',
      endTime: '',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      category: 'meeting'
    });
    setShowEventModal(true);
  }, [today]);

  // Single click: always show inline selected-day panel
  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Double-click: open add-event modal on all devices
  const handleDateDoubleClick = useCallback((dateKey: string) => {
    handleAddEvent(dateKey);
  }, [handleAddEvent]);

  // Platform detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide sidebar by default on mobile to show the main calendar first
  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    setAnimateCalendar(true);
    const timer = setTimeout(() => setAnimateCalendar(false), 500);
    return () => clearTimeout(timer);
  }, [currentDate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
      
      switch(e.key) {
        case 'ArrowLeft':
          navigateMonth(-1);
          break;
        case 'ArrowRight':
          navigateMonth(1);
          break;
        case 't':
        case 'T':
          setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
          break;
        case 'n':
        case 'N':
          handleAddEvent();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigateMonth, handleAddEvent, today]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, events]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    filteredEvents.forEach(event => {
      if (!map[event.date]) {
        map[event.date] = [];
      }
      map[event.date].push(event);
    });
    
    Object.keys(map).forEach(date => {
      map[date].sort((a, b) => {
        const timeA = a.startTime.split(':').map(Number);
        const timeB = b.startTime.split(':').map(Number);
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
      });
    });
    
    return map;
  }, [filteredEvents]);

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      color: event.color,
      category: event.category
    });
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(e => e.id !== eventId));
    showNotification('Event deleted successfully', 'success');
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    const conflict = checkConflict(formData, events, editingEvent?.id || null);
    if (conflict) {
      showNotification(`⚠️ Conflict with "${conflict.title}" (${conflict.startTime}-${conflict.endTime})`, 'error');
      return;
    }

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...formData, id: e.id } : e));
      showNotification('Event updated successfully', 'success');
    } else {
      const newEvent: CalendarEvent = {
        ...formData,
        id: Date.now()
      };
      setEvents([...events, newEvent]);
      showNotification('Event added successfully', 'success');
    }

    setShowEventModal(false);
    setEditingEvent(null);
  };

  const getEventStats = () => {
    const total = filteredEvents.length;
    const byCategory = CATEGORIES.slice(1).map(cat => ({
      name: cat,
      count: filteredEvents.filter(e => e.category === cat).length
    }));
    return { total, byCategory };
  };

  const stats = getEventStats();

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className={`aspect-square p-2 ${darkMode ? 'bg-gray-850' : 'bg-gray-50'}`}></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateKey = formatDateKey(year, month, day);
      const dayEvents = eventsByDate[dateKey] || [];

      days.push(
        <CalendarDay
          key={day}
          year={year}
          month={month}
          day={day}
          today={today}
          selectedDate={selectedDate}
          dayEvents={dayEvents}
          hoveredEvent={hoveredEvent}
          darkMode={darkMode}
          animateCalendar={animateCalendar}
          onDateClick={handleDateClick}
          onDateDoubleClick={handleDateDoubleClick}
          onEventClick={handleEditEvent}
          onEventHover={setHoveredEvent}
        />
      );
    }

    return days;
  };

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = formatDateKey(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    return eventsByDate[dateKey] || [];
  }, [selectedDate, eventsByDate]);

  const upcomingEvents = useMemo(() => {
    const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());
    return filteredEvents
      .filter(event => event.date >= todayKey)
      .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
      .slice(0, 5);
  }, [filteredEvents, today]);

  // Sync global theme to CSS variables so the whole app switches consistently
  useEffect(() => {
    const rootEl = document.documentElement;
    rootEl.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* Notification Toast */}
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {/* Event Modal */}
      <CalendarModal
        showModal={showEventModal}
        editingEvent={editingEvent}
        formData={formData}
        darkMode={darkMode}
        onClose={() => {
          setShowEventModal(false);
          setEditingEvent(null);
        }}
        onSubmit={handleSubmitEvent}
        onFormDataChange={(data) => setFormData({ ...formData, ...data })}
      />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <CalendarSidebar
          showSidebar={showSidebar}
          darkMode={darkMode}
          showMiniCalendar={showMiniCalendar}
          currentDate={currentDate}
          eventsByDate={eventsByDate}
          stats={stats}
          upcomingEvents={upcomingEvents}
          isMobile={isMobile}
          onClose={() => setShowSidebar(false)}
          onDateSelect={(date) => {
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
            setSelectedDate(date);
          }}
          onEventClick={handleEditEvent}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="pt-1 pr-3 pb-4 pl-3 md:pr-6 md:pb-6 md:pl-6">
            {/* Top Bar */}
            <TopBar
              darkMode={darkMode}
              currentDate={currentDate}
              today={today}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onToggleSidebar={() => setShowSidebar(!showSidebar)}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              onAddEvent={() => handleAddEvent()}
              onNavigateMonth={navigateMonth}
              onGoToToday={() => {
                setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
                setSelectedDate(null);
              }}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
            />

            {/* Calendar Grid */}
            <div className={`app-card elevated border border-app p-2 sm:p-3 md:p-5`}>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {DAY_NAMES.map(day => (
                  <div key={day} className={`text-center font-bold py-1.5 sm:py-2.5 text-[11px] sm:text-sm text-muted`}>
                    {day}
                  </div>
                ))}
                {renderCalendarDays()}
              </div>
            </div>

            {/* Selected Date Events */}
            <SelectedDateEvents
              selectedDate={selectedDate}
              selectedDateEvents={selectedDateEvents}
              darkMode={darkMode}
              onClose={() => setSelectedDate(null)}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => handleAddEvent()}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 btn-accent text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-40`}
        title="Add Event (N)"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default Calendar;
