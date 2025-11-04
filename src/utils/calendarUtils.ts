export const daysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const firstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const formatDateKey = (year: number, month: number, day: number): string => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const isToday = (year: number, month: number, day: number, today: Date): boolean => {
  return year === today.getFullYear() && 
         month === today.getMonth() && 
         day === today.getDate();
};

export const isSelectedDate = (year: number, month: number, day: number, selectedDate: Date | null): boolean => {
  if (!selectedDate) return false;
  return year === selectedDate.getFullYear() && 
         month === selectedDate.getMonth() && 
         day === selectedDate.getDate();
};

export interface CalendarEvent {
  id: number;
  startTime: string;
  endTime: string;
  color: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export const checkConflict = (newEvent: Partial<CalendarEvent>, events: CalendarEvent[], excludeId: number | null = null): CalendarEvent | null => {
  const dateEvents = events.filter(e => e.date === newEvent.date && e.id !== excludeId);
  
  if (!newEvent.startTime || !newEvent.endTime) return null;

  const newStart = newEvent.startTime.split(':').map(Number);
  const newEnd = newEvent.endTime.split(':').map(Number);
  const newStartMin = newStart[0] * 60 + newStart[1];
  const newEndMin = newEnd[0] * 60 + newEnd[1];

  for (let event of dateEvents) {
    const eventStart = event.startTime.split(':').map(Number);
    const eventEnd = event.endTime.split(':').map(Number);
    const eventStartMin = eventStart[0] * 60 + eventStart[1];
    const eventEndMin = eventEnd[0] * 60 + eventEnd[1];

    if (
      (newStartMin >= eventStartMin && newStartMin < eventEndMin) ||
      (newEndMin > eventStartMin && newEndMin <= eventEndMin) ||
      (newStartMin <= eventStartMin && newEndMin >= eventEndMin)
    ) {
      return event;
    }
  }
  return null;
};

export const hasConflict = (events: CalendarEvent[]): boolean => {
  for (let i = 0; i < events.length - 1; i++) {
    const event1End = events[i].endTime.split(':').map(Number);
    const event2Start = events[i + 1].startTime.split(':').map(Number);
    const endMinutes = event1End[0] * 60 + event1End[1];
    const startMinutes = event2Start[0] * 60 + event2Start[1];
    if (endMinutes > startMinutes) {
      return true;
    }
  }
  return false;
};
